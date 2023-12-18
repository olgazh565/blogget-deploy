import {useEffect, useState} from 'react';
import style from './Tabs.module.scss';
import PropTypes from 'prop-types';
import {assignId} from '../../../utils/generateRandomId';
import {debounceRaf} from '../../../utils/debounce';
import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {Text} from '../../../UI/Text/Text';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {message} from 'antd';
import {
  fetchPosts,
  resetPostsState
} from '../../../store/postsReducer/postsSlice';

const LIST = [
  {value: 'Главная', Icon: HomeIcon, link: 'rising'},
  {value: 'Топ', Icon: TopIcon, link: 'top'},
  {value: 'Лучшие', Icon: BestIcon, link: 'best'},
  {value: 'Горячие', Icon: HotIcon, link: 'hot'}
].map(assignId);

export const Tabs = () => {
  const [isDropdownOpen, setDropDownOpen] = useState(false);
  const [isDropdown, setDropDown] = useState(true);
  const [chosenTab, setChosenTab] = useState('Главная');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {page, status} = useSelector(state => state.postsReducer);
  const token = useSelector(state => state.tokenReducer.token);
  const [messageApi, contextHolder] = message.useMessage();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setDropDown(true);
      setDropDownOpen(false);
    } else {
      setDropDown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Для продолжения работы необходимо авторизоваться',
    });
  };

  const handleClick = (value, link) => {
    if (!token) warning();
    setChosenTab(value);
    navigate(`/category/${link}`);
    if (page !== link && status) dispatch(resetPostsState());
    if (page !== link && token) dispatch(fetchPosts(link));
  };

  return (
    <div className={style.container}>
      {contextHolder}
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setDropDownOpen(!isDropdownOpen)}>
            {chosenTab}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}
      {(isDropdownOpen || !isDropdown) && (
        <ul className={style.list} onClick={() => setDropDownOpen(false)}>
          {LIST.map(({value, link, id, Icon}) => (
            <Text As='li' className={style.item} key={id}>
              <Text
                As='button'
                className={style.btn}
                onClick={() => handleClick(value, link)}
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </Text>
            </Text>
          ))}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  addItem: PropTypes.func,
};
