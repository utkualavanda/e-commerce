import { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  calculateTotals,
  removeItem,
} from '../../features/cart/cartSlice';
import { changeTab } from '../../features/tab/tabSlice';
import { Button, Layout, LoadingModal } from '../../components';
import {
  ICartItem,
  ICompany,
  IDataItem,
  IFilter,
  ISearch,
  ITag,
  itemTypes,
  sortTypes,
} from './type';

const Home = () => {
  const { total, cartItems } = useSelector((store: any) => store.cart);
  const { tabSelect } = useSelector((store: any) => store.tab);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<ITag[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [search, setSearch] = useState<ISearch>({ brandName: '', tagName: '' });
  const [sort, setSort] = useState<string>(sortTypes.priceLowToHigh);
  const [filterBrandOptions, setFilterBrandOpitons] = useState<IFilter[]>([]);
  const [filterTagOptions, setFilterTagOptions] = useState<IFilter[]>([]);
  const [filteredDataItems, setFilteredDataItems] = useState<IDataItem[]>([]);

  const [{ data, loading }, getData] = useAxios<IDataItem[]>(
    {
      baseURL: process.env.REACT_APP_JSON_SERVER_API,
      url: `items?itemType=${tabSelect}&_sort=${sort.split('-')[0]}&_order=${
        sort.split('-')[1]
      }`,
    },
    { manual: true }
  );

  const getItemsData = async () => {
    try {
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data?.length && data[0]?.itemType !== tabSelect) {
      setTags([]);
      setCompanies([]);
    }
    getItemsData();
    //eslint-disable-next-line
  }, [tabSelect, sort]);

  useEffect(() => {
    if (data?.length) {
      let tagsArr: ITag[] = [];
      let companiesArr: ICompany[] = [];
      let sortedArr: IDataItem[] = [];

      data.forEach((item) => {
        item.tags.forEach((itemTag) => {
          const tagIndex = tagsArr.findIndex((e) => e.name === itemTag);
          if (tagIndex > -1) {
            tagsArr[tagIndex].amount += 1;
          } else {
            tagsArr.push({ name: itemTag, amount: 1 });
          }
        });

        const companyIndex = companiesArr.findIndex(
          (e) => e.name === item.manufacturer
        );
        if (companyIndex > -1) {
          companiesArr[companyIndex].amount += 1;
        } else {
          companiesArr.push({ name: item.manufacturer, amount: 1 });
        }

        sortedArr.push(item);
      });

      setFilteredDataItems(sortedArr);
      setTags(tagsArr);
      setCompanies(companiesArr);
    }
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    dispatch(calculateTotals());
    //eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    let tempCompanies: IFilter[] = companies.map((company) => ({
      name: company.name,
      checked: false,
    }));
    setFilterBrandOpitons(tempCompanies);
  }, [companies]);

  useEffect(() => {
    let tempTags: IFilter[] = tags.map((tag) => ({
      name: tag.name,
      checked: false,
    }));
    setFilterTagOptions(tempTags);
  }, [tags]);

  useEffect(() => {
    if (data?.length) {
      let dataItemsCopy = [...data];
      const selectedBrands: IFilter[] = filterBrandOptions.filter(
        (filterBrand) => filterBrand.checked
      );
      const selectedTags: IFilter[] = filterTagOptions.filter(
        (filterTag) => filterTag.checked
      );

      if (selectedBrands.length > 0 || selectedTags.length > 0) {
        if (selectedBrands.length) {
          dataItemsCopy = dataItemsCopy.filter((item) =>
            selectedBrands.find(
              (selectedBrand) => selectedBrand.name === item.manufacturer
            )
          );
        }
        if (selectedTags.length) {
          dataItemsCopy = dataItemsCopy.filter((item) =>
            selectedTags.find(
              (selectedTag) =>
                item?.tags?.filter((tag) => tag === selectedTag.name)?.length
            )
          );
        }
      }
      setPage(1);
      setFilteredDataItems(dataItemsCopy);
    }
  }, [filterBrandOptions, filterTagOptions, data]);

  return (
    <>
      <Layout title="Getir Assignment">
        <div className="container">
          <div className="home-container">
            <div className="filter-sort-container">
              <div className="filter-sort-element">
                <div className="filter-sort-header">Sorting</div>
                <div className="filter-sort-options-container">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={sort}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={sortTypes.priceLowToHigh}
                      control={
                        <Radio
                          onChange={() => setSort(sortTypes.priceLowToHigh)}
                        />
                      }
                      label="Price low to high"
                    />
                    <FormControlLabel
                      value={sortTypes.priceHighToLow}
                      control={
                        <Radio
                          onChange={() => setSort(sortTypes.priceHighToLow)}
                        />
                      }
                      label="Price high to low"
                    />
                    <FormControlLabel
                      value={sortTypes.newToOld}
                      control={
                        <Radio onChange={() => setSort(sortTypes.newToOld)} />
                      }
                      label="New to old"
                    />
                    <FormControlLabel
                      value={sortTypes.oldToNew}
                      control={
                        <Radio onChange={() => setSort(sortTypes.oldToNew)} />
                      }
                      label="Old to new"
                    />
                  </RadioGroup>
                </div>
              </div>
              <div className="filter-sort-element">
                <div className="filter-sort-header">Brands</div>
                <div className="filter-sort-options-container">
                  <div className="filter-search">
                    <TextField
                      id="search-brand"
                      label="Search Brand"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setSearch((prevState) => ({
                          ...prevState,
                          brandName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="filter-sort-options">
                    <FormGroup>
                      {companies.map((company, i) => {
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  filterBrandOptions[i]?.checked || false
                                }
                                onChange={(e) => {
                                  setFilterBrandOpitons((prevState) => {
                                    const tempState = [...prevState];
                                    tempState[i].checked = e.target.checked;
                                    return tempState;
                                  });
                                }}
                              />
                            }
                            label={`${company.name} (${company.amount})`}
                            key={i}
                            hidden={
                              !company.name
                                .toLowerCase()
                                .includes(search.brandName.toLowerCase())
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="filter-sort-element">
                <div className="filter-sort-header">Tags</div>
                <div className="filter-sort-options-container">
                  <div className="filter-search">
                    <TextField
                      id="search-tag"
                      label="Search Tag"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setSearch((prevState) => ({
                          ...prevState,
                          tagName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="filter-sort-options">
                    <FormGroup>
                      {tags.map((tag, i) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterTagOptions[i]?.checked || false}
                              onChange={(e) => {
                                setFilterTagOptions((prevState) => {
                                  const tempState = [...prevState];
                                  tempState[i].checked = e.target.checked;
                                  return tempState;
                                });
                              }}
                            />
                          }
                          label={`${tag.name} (${tag.amount})`}
                          key={i}
                          hidden={
                            !tag.name
                              .toLowerCase()
                              .includes(search.tagName.toLowerCase())
                          }
                        />
                      ))}
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="products-container">
              <div className="products-header">Products</div>
              <div className="tab-container">
                <div
                  className={`tab-element ${
                    tabSelect === itemTypes.mug ? 'active' : ''
                  }`}
                  onClick={() => {
                    tabSelect !== itemTypes.mug &&
                      dispatch(changeTab(itemTypes.mug));
                  }}
                >
                  mug
                </div>
                <div
                  className={`tab-element ${
                    tabSelect === itemTypes.shirt ? 'active' : ''
                  }`}
                  onClick={() => {
                    tabSelect !== itemTypes.shirt &&
                      dispatch(changeTab(itemTypes.shirt));
                  }}
                >
                  shirt
                </div>
              </div>
              {filteredDataItems?.slice((page - 1) * 16, (page - 1) * 16 + 16)
                ?.length > 0 ? (
                <>
                  <div className="product-list">
                    {filteredDataItems
                      .slice((page - 1) * 16, (page - 1) * 16 + 16)
                      .map((item, i) => (
                        <div className="product-list-element" key={i}>
                          <div className="product-image-container">
                            <img src="images/product.png" alt="test" />
                          </div>
                          <div className="product-price">{`₺ ${item.price}`}</div>
                          <div className="product-name">{item.name}</div>
                          <Button
                            label="Add"
                            onClick={() => dispatch(addItem(item))}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="list-pagination">
                    <Pagination
                      count={Math.ceil(filteredDataItems.length / 16)}
                      page={page}
                      onChange={(_e, pageNumber) => setPage(pageNumber)}
                    />
                  </div>
                </>
              ) : (
                'Nothing to display'
              )}
            </div>
            <div className="cart-container">
              {cartItems?.length > 0 ? (
                <>
                  {cartItems.map((cartItem: ICartItem, i: number) => (
                    <div className="cart-item" key={i}>
                      <div className="item-info">
                        {cartItem.name}
                        <div className="cart-item-price">{`₺${cartItem.price}`}</div>
                      </div>
                      <div className="item-amount-container">
                        <IconButton onClick={() => dispatch(removeItem(i))}>
                          <Remove />
                        </IconButton>
                        <span className="item-amount">{cartItem.amount}</span>
                        <IconButton onClick={() => dispatch(addItem(cartItem))}>
                          <Add />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="cart-item">
                  <div className="item-info">Empty Cart</div>
                </div>
              )}
              <div className="cart-total">
                <Button variant="outlined" label={`₺${total}`} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {loading && <LoadingModal />}
    </>
  );
};

export default Home;
