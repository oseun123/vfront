import Home from './components/users/Home.vue'
import Login from './components/admin/Login.vue'
import Signup from './components/admin/Signup.vue'
import Adminhome from './components/admin/Adminhome.vue'
import Takequiz from './components/admin/Takequiz.vue'
import Requestpassword from './components/admin/password/Requestpassword.vue'
import Responsepassword from './components/admin/password/Responsepassword.vue'
import Uploadcsv from './components/admin/Uploadcsv.vue'
import Uploadmaterial from './components/admin/Uploadmaterial.vue'
import Uploadimages from './components/admin/Uploadimages.vue'
import services from './services';
export default [
    {
        path: '/', component: Home, beforeEnter: (to, from, next) => {
            try {

                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {

                    next();
                }
            } catch (err) {

                next('/login');
            }
        }
    },
    {
        path: '/upload-questions', component: Uploadcsv, beforeEnter: (to, from, next) => {
            try {

                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {

                    next('/login');
                }
            } catch (err) {

                next('/login');
            }
        }
    },
    {
        path: '/upload-images', component: Uploadimages, beforeEnter: (to, from, next) => {
            try {

                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {

                    next('/login');
                }
            } catch (err) {

                next('/login');
            }
        }
    },
    {
        path: '/upload-materials', component: Uploadmaterial, beforeEnter: (to, from, next) => {
            try {

                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {

                    next('/login');
                }
            } catch (err) {

                next('/login');
            }
        }
    },
    {
        path: '/request-password', component: Requestpassword, beforeEnter: (to, from, next) => {
          
                if (services.isloggedIn()) {
                    next('/');
                } else {
                    next();
                }
           

        }
    },
    {
        path: '/response-password', component: Responsepassword, beforeEnter: (to, from, next) => {

            if (services.isloggedIn()) {
                next('/');
            } else {
                next();
            }


        }
    },
    {
        path: '/login', component: Login, beforeEnter: (to, from, next) => {
            try {
                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next('/admin');
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {
                    next();
                }
            } catch (err) {
                next('/login');
            }


        }
    },
    {
        path: '/signup', component: Signup, beforeEnter: (to, from, next) => {
            try {
                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next('/admin');
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next('/quiz');
                } else {
                    next();
                }
            } catch (err) {
                next('/login');
            }


        }
    },
    {
        path: '/admin', component: Adminhome, beforeEnter: (to, from, next) => {
            try {
            
                if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    // alert('ok1');
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    // alert('ok2');
                    next('/quiz');
                } else {
                    alert(services.isAdmin());
                    next('/login');
                }
            } catch (err) {
                // alert('ok4');
                next('/login');
            }
        }
    },
    {
        path: '/quiz', component: Takequiz, beforeEnter: (to, from, next) => {
            try {
                if (services.isloggedIn() && parseInt(services.isAdmin()) == 0) {
                    next();
                } else if (services.isloggedIn() && parseInt(services.isAdmin()) == 1) {
                    next('/admin');
                } else {
                    next('/login');
                }
            } catch (err) {
                next('/login');
            }

        }

    },
    { path: '*', component: Home },

]