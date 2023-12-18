import style from './Main.module.scss';
import {Layout} from '../Layout/Layout';
import {Tabs} from './Tabs/Tabs';
import {Route, Routes} from 'react-router-dom';
import {NotFoundPage} from '../NotFoundPage/NotFoundPage';
import {StartPage} from '../StartPage/StartPage';
import {CategoryList} from '../CategoryList/CategoryList';
import {SearchList} from '../SearchList/SearchList';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/category/:page/*' element={<CategoryList />} />
        <Route path='/search/*' element={<SearchList />} />
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </Layout>
  </main>
);


