import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'

import Login from "../components/auth/Login.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"
import Tasks from "../components/tasks/Tasks.vue"
import Task from "../components/tasks/Task.vue"
import Projects from "../components/projects/Projects.vue"
import Project from "../components/projects/Project.vue"
import Users from "../components/users/Users.vue"
import User from "../components/users/User.vue"
import ProjectTasks from "../components/projects/ProjectTasks.vue"
//import TransactionNew from "../components/transactions/TransactionNew";
import VcardDashboard from "../components/Dashboards/VcardDashboard";
//import AdminDashboard from "../components/Dashboards/AdminDashboard";
import Transactions from "../components/transactions/Transactions";
import Vcards from "../components/vcards/Vcards.vue";
import Vcard from "../components/vcards/Vcard";
import Categories from "../components/Categories/Categories";
import Transaction from "../components/transactions/Transaction";
import Category from "../components/Categories/Category";
import DefaultCategories from "../components/DefaultCategories/DefaultCategories";
import DefaultCategory from "../components/DefaultCategories/DefaultCategory";
import Dashboard from "../components/users/Dashboard";
import VcardReport from "../components/vcards/VcardReport";
import Report from "../components/users/Report";



import RequestMoney from "../components/Dashboards/RequestMoney";
import Notifications from "../components/Notifications/Notifications";
import Administrators from "../components/Administrators/Administrators";
import Administrator from "../components/Administrators/Administrator";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    //DAE A PARTIR DAQUI
    {
        path: '/administrators',
        name: 'Administrators',
        component: Administrators
    },
    {
        path: '/administrators/new',
        name: 'NewAdministrator',
        component: Administrator,
        props: () => ({username: ''})
    },
    {
        path: '/administrators/:usernameIn',
        name: 'EditAdministrator',
        component: Administrator,
        props: true

    },













    //DAE TOTAS ATE AQUI






    {
        path: '/password',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/dashboard',
        name: 'VcardDashboard',
        component: VcardDashboard
    },
    {
        path: '/RequestMoney',
        name: 'RequestMoney',
        component: RequestMoney
    },
    {
        path: '/reports',
        name: 'VcardReport',
        component: VcardReport
    },
    {

        path: '/notifications',
        name: 'Notifications',
        component: Notifications
    },

    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: Dashboard
    },
    {
        path: '/admin/reports',
        name: 'AdminReport',
        component: Report
    },
    {
        path: '/Categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: '/DefaultCategories',
        name: 'DefaultCategories',
        component: DefaultCategories
    },
    {
        path: '/categories/:id',
        name: 'Category',
        component: Category,

        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/categories/new',
        name: 'NewCategory',
        component: Category,
        props: () => ({id: null})
    },
    {
        path: '/DefaultCategories/:id',
        name: 'DefaultCategory',
        component: DefaultCategory,

        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/DefaultCategories/new',
        name: 'NewDefaultCategory',
        component: DefaultCategory,
        props: () => ({id: null})
    },
    {
        path: '/vcards',
        name: 'vcards',
        component: Vcards,
    },
    {
        path: '/vcards/:vcard',
        name: 'vcard',
        component: Vcard,
        props: route => ({phoneNumber: route.params.vcard})
    },
    {
        path: '/profile/:vcard',
        name: 'vcardProfile',
        component: Vcard,
        props: route => ({phoneNumber: route.params.vcard})
    },
    {
        path: '/Register',
        name: 'Register',
        component: Vcard,
        props: () => ({phoneNumber: null})
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
    },
    {
        path: '/tasks/current',
        name: 'CurrentTasks',
        component: Tasks,
        props: {onlyCurrentTasks: true, tasksTitle: 'Current Tasks'}
    },
    {
        path: '/transaction/:phone_number/:value',
        name: 'TransactionToPhoneNumber',
        component: Transaction,
        props: route => ({phone_number:route.params.phone_number,
            value: parseFloat(route.params.value)}),
        //props: true,

    },
    {
        path: '/tasks/:id',
        name: 'Task',
        component: Task,
    },
    {
        path: '/tasks/new',
        name: 'NewTask',
        component: Task,
        props: (route) => ({
            id: null,
            fixedProject: route.params.fixedProject ? parseInt(route.params.fixedProject) : null
        })
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    },
    {
        path: '/projects/:id/tasks',
        name: 'ProjectTasks',
        component: ProjectTasks,
        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/projects/:id',
        name: 'Project',
        component: Project,
        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/projects/new',
        name: 'NewProject',
        component: Project,
        props: () => ({id: null})
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/users/:id',
        name: 'User',
        component: User,
        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/users/new',
        name: 'NewUser',
        component: User,
        props: () => ({id: 0})
    },
    {
        path: '/transactions/new',
        name: 'NewTransaction',
        component: Transaction,
        props: () => ({id: null})
    },
    {
        path: '/vcards/:vcard/transactions/new',
        name: 'NewAdminTransaction',
        component: Transaction,
        props: route => ({vcard: route.params.vcard})
    },
    {
        path: '/vcards/:vcard/transactions',
        name: 'Transactions',
        component: Transactions,
        props: route => ({vcard: route.params.vcard})
    },
    {
        path: '/transactions/:id',
        name: 'Transaction',
        component: Transaction,
        props: route => ({id: parseInt(route.params.id)})
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router