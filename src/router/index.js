import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

import Administrators from "../components/Administrators/Administrators";
import Administrator from "../components/Administrators/Administrator";
import HealthcareProfessionals from "../components/HealthcareProfessionals/HealthcareProfessionals";
import HealthcareProfessional from "../components/HealthcareProfessionals/HealthcareProfessional";
import Patients from "../components/Patients/Patients";
import Patient from "../components/Patients/Patient";
import BiomedicalIndicators from "../components/BiomedicalIndicators/BiomedicalIndicators";
import BiomedicalIndicator from "../components/BiomedicalIndicators/BiomedicalIndicator";
import Prcs from "../components/PRCs/Prcs";
import PrcDetail from "../components/PRCs/PrcDetail";
import UserIndicators from "../components/BiomedicalIndicators/UserIndicators";
import UserNewBiomedicalIndicator from "../components/BiomedicalIndicators/UserNewBiomedicalIndicator";
import HealthcareProfessionalIndicators
    from "../components/HealthCareProfessionalIndicators/HealthcareProfessionalIndicators";
import Login from "../components/auth/Login";
import Confirm from "../components/auth/Confirm";

import PatientPrcs from "../components/PRCs/PatientPrcs";
import TreatmentTypes from "../components/TreatmentTypes/PrcTreatmentTypes";
import TreatmentType from "../components/TreatmentTypes/TreatmentType";
import DocumentUpload from "../components/Patients/DocumentUpload";
import DocumentTable from "../components/Patients/DocumentTable";
import BiomedicalDataHistoryCharts from "../components/Charts/BiomedicalDataHistoryCharts";



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
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
        meta: { requiresAuth: false },
        beforeEnter: (to, from, next) => {
            if (!to.query.token){
                next({name: 'Home'})
            }else {
                next()
            }
        }
    },

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
    {
        path: '/HealthcareProfessionals',
        name: 'HealthcareProfessionals',
        component: HealthcareProfessionals
    },
    {
        path: '/HealthcareProfessional/new',
        name: 'NewHealthcareProfessional',
        component: HealthcareProfessional,
        props: () => ({username: ''})
    },
    {
        path: '/HealthcareProfessional/:usernameIn',
        name: 'EditHealthcareProfessional',
        component: HealthcareProfessional,
        props: true

    },
    {
        path: '/Patients',
        name: 'Patients',
        component: Patients
    },
    {
        path: '/Patient/new',
        name: 'NewPatient',
        component: Patient,
        props: () => ({username: ''})
    },
    {
        path: '/Patient/:usernameIn',
        name: 'EditPatient',
        component: Patient,
        props: true

    },
    {
        path: '/BiomedicalIndicators',
        name: 'BiomedicalIndicators',
        component: BiomedicalIndicators
    },
    {
        path: '/BiomedicalIndicators/new',
        name: 'NewBiomedicalIndicator',
        component: BiomedicalIndicator,
        props: () => ({id: null})
    },
    {
        path: '/PRCs',
        name: 'Prcs',
        component: Prcs,
        props: true
    },
    {
        path: '/PRCs/:prcCode',
        name: 'EditPrc',
        component: PrcDetail,
        props: route => ({
            prcCode: route.params.prcCode
        })
    },
    {
        path: '/BiomedicalIndicators/:id/:indicatorType',
        name: 'EditBiomedicalIndicator',
        component: BiomedicalIndicator,
        props: route => ({id:parseInt(route.params.id),
            indicatorType:route.params.indicatorType}),
    },
    {
        path: '/UserIndicators',
        name: 'UserIndicators',
        component: UserIndicators

    },
    {
        path: '/UserNewMeasure/:patientUsername',
        name: 'UserNewMeasure',
        component: UserNewBiomedicalIndicator,
        props : true

    },
    {
        path: '/UserEditMeasure/:patientUsername/:indicatorID/:operationType',
        name: 'UserEditMeasure',
        component: UserNewBiomedicalIndicator,
        props : true

    },
    {
        path: '/HealthcareProfessionalIndicators',
        name: 'HealthcareProfessionalIndicators',
        component: HealthcareProfessionalIndicators

    },
    {

        path: '/Patient/:usernameIn/prcs',
        name: 'PatientPrcs',
        component: PatientPrcs,
        props: route => ({
            usernameIn: route.params.usernameIn
        })
    },
    {
        path: '/TreatmentTypes',
        name: 'TreatmentTypes',
        component: TreatmentTypes,
        props: route => ({
            prcCode: route.params.prcCode
        })
    },
    {
        path: '/TreatmentTypes',
        name: 'TreatmentTypes',
        component: TreatmentTypes,
        props: true
    },
    {
        path: '/treatmentTypes/new/:prcCode',
        name: 'NewTreatmentType',
        component: TreatmentType,
        props: route => ({treatmentTypeCode: -1,
            prcCode:route.params.prcCode}),
    },
    {
        path: '/treatmentTypes/:treatmentTypeCode/:treatmentTypeType/:prcCode',
        name: 'EditTreatmentType',
        component: TreatmentType,
        props: route => ({
            treatmentTypeCode: route.params.treatmentTypeCode,
            treatmentTypeType: route.params.treatmentTypeType,
            prcCode: route.params.prcCode
        })
    },
    {
        path: '/DocumentUpload',
        name: 'DocumentUpload',
        component: DocumentUpload,
    },

    {
        path: '/DocumentUpload/:username',
        name: 'DocumentUserTable',
        component: DocumentTable,
        props: true
    },
    {
        path: '/BiomedicalDataHistoryCharts',
        name: 'BiomedicalDataHistoryCharts',
        component: BiomedicalDataHistoryCharts,
        props: true
    },






    /**
     *
     * ROTAS DAE ATE AQUI
     *
     *
     */
    // {
    //     path: '/password',
    //     name: 'ChangePassword',
    //     component: ChangePassword
    // },
    // {
    //     path: '/dashboard',
    //     name: 'VcardDashboard',
    //     component: VcardDashboard
    // },
    // {
    //     path: '/RequestMoney',
    //     name: 'RequestMoney',
    //     component: RequestMoney
    // },
    // {
    //     path: '/reports',
    //     name: 'VcardReport',
    //     component: VcardReport
    // },
    // {
    //
    //     path: '/notifications',
    //     name: 'Notifications',
    //     component: Notifications
    // },
    //
    // {
    //     path: '/admin/dashboard',
    //     name: 'AdminDashboard',
    //     component: Dashboard
    // },
    // {
    //     path: '/admin/reports',
    //     name: 'AdminReport',
    //     component: Report
    // },
    // {
    //     path: '/Categories',
    //     name: 'Categories',
    //     component: Categories
    // },
    // {
    //     path: '/DefaultCategories',
    //     name: 'DefaultCategories',
    //     component: DefaultCategories
    // },
    // {
    //     path: '/categories/:id',
    //     name: 'Category',
    //     component: Category,
    //
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/categories/new',
    //     name: 'NewCategory',
    //     component: Category,
    //     props: () => ({id: null})
    // },
    // {
    //     path: '/DefaultCategories/:id',
    //     name: 'DefaultCategory',
    //     component: DefaultCategory,
    //
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/DefaultCategories/new',
    //     name: 'NewDefaultCategory',
    //     component: DefaultCategory,
    //     props: () => ({id: null})
    // },
    // {
    //     path: '/vcards',
    //     name: 'vcards',
    //     component: Vcards,
    // },
    // {
    //     path: '/vcards/:vcard',
    //     name: 'vcard',
    //     component: Vcard,
    //     props: route => ({phoneNumber: route.params.vcard})
    // },
    // {
    //     path: '/profile/:vcard',
    //     name: 'vcardProfile',
    //     component: Vcard,
    //     props: route => ({phoneNumber: route.params.vcard})
    // },
    // {
    //     path: '/Register',
    //     name: 'Register',
    //     component: Vcard,
    //     props: () => ({phoneNumber: null})
    // },
    // {
    //     path: '/tasks',
    //     name: 'Tasks',
    //     component: Tasks,
    // },
    // {
    //     path: '/tasks/current',
    //     name: 'CurrentTasks',
    //     component: Tasks,
    //     props: {onlyCurrentTasks: true, tasksTitle: 'Current Tasks'}
    // },
    // {
    //     path: '/transaction/:phone_number/:value',
    //     name: 'TransactionToPhoneNumber',
    //     component: Transaction,
    //     props: route => ({phone_number:route.params.phone_number,
    //         value: parseFloat(route.params.value)}),
    //     //props: true,
    //
    // },
    // {
    //     path: '/tasks/:id',
    //     name: 'Task',
    //     component: Task,
    // },
    // {
    //     path: '/tasks/new',
    //     name: 'NewTask',
    //     component: Task,
    //     props: (route) => ({
    //         id: null,
    //         fixedProject: route.params.fixedProject ? parseInt(route.params.fixedProject) : null
    //     })
    // },
    // {
    //     path: '/projects',
    //     name: 'Projects',
    //     component: Projects,
    // },
    // {
    //     path: '/projects/:id/tasks',
    //     name: 'ProjectTasks',
    //     component: ProjectTasks,
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/projects/:id',
    //     name: 'Project',
    //     component: Project,
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/projects/new',
    //     name: 'NewProject',
    //     component: Project,
    //     props: () => ({id: null})
    // },
    // {
    //     path: '/users',
    //     name: 'Users',
    //     component: Users,
    // },
    // {
    //     path: '/users/:id',
    //     name: 'User',
    //     component: User,
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/users/new',
    //     name: 'NewUser',
    //     component: User,
    //     props: () => ({id: 0})
    // },
    // {
    //     path: '/transactions/new',
    //     name: 'NewTransaction',
    //     component: Transaction,
    //     props: () => ({id: null})
    // },
    // {
    //     path: '/vcards/:vcard/transactions/new',
    //     name: 'NewAdminTransaction',
    //     component: Transaction,
    //     props: route => ({vcard: route.params.vcard})
    // },
    // {
    //     path: '/vcards/:vcard/transactions',
    //     name: 'Transactions',
    //     component: Transactions,
    //     props: route => ({vcard: route.params.vcard})
    // },
    // {
    //     path: '/transactions/:id',
    //     name: 'Transaction',
    //     component: Transaction,
    //     props: route => ({id: parseInt(route.params.id)})
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})



router.beforeEach((to, from, next) => {
    if ((to.name == 'Login') || (to.name == 'Home') || (to.name == 'Register') || (to.name == 'Confirm')) {
        next()
        return
    }
    if (!sessionStorage.getItem('token')) {
        next({name: 'Login'})
        return
    }



    next()



})




export default router
