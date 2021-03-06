import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PageNotFound from "../views/PageNotFound.vue";
import ContactView from "../views/ContactView.vue";
import BookView from "../views/BookView.vue";
import NewBook from "../components/NewBook.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:catchAll(.*)*',
      name: "PageNotFound",
      component: PageNotFound,
    }
    ,
    {
      path: '/contact',
      name: "Contact",
      component: ContactView ,
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookView,
    },
    {
      path: '/newbook',
      name: "NewBook",
      component: NewBook,
    }
  ]
})

export default router
