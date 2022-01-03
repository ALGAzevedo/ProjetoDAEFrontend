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

import store from '../store'

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

    if (to.name == 'Administrators') {
        if (sessionStorage.getItem('userType') != 'Administrator') {
            next(false)
            return
        }
    }
    if (to.name == 'Administrators') {
        if (sessionStorage.getItem('userType') != 'Administrator') {
            next(false)
            return
        }
    }
    //ONLY SUPER ADMINS CAN CREATE NEW ADMINS
    if (to.name == 'NewAdministrator') {
        if (sessionStorage.getItem('userType') != 'Administrator' || !store.state.user.superAdmin) {
            next(false)
            return
        }
    }
    if (to.name == 'EditAdministrator') {
        if (sessionStorage.getItem('userType') != 'Administrator' ||
            (!store.state.user.superAdmin && store.state.user.username != to.params.usernameIn)) {
            next(false)
            return
        }
    }
    if (to.name == 'HealthcareProfessionals') {
        if (sessionStorage.getItem('userType') != 'Administrator' && sessionStorage.getItem('userType') != 'HealthcareProfessional') {
            next(false)
            return
        }
    }
    //ONLY ADMINS CAN CREATE NEW HP's
    if (to.name == 'NewHealthcareProfessional') {
        if (sessionStorage.getItem('userType') != 'Administrator') {
            next(false)
            return
        }
    }
    if (to.name == 'EditHealthcareProfessional') {
        if (sessionStorage.getItem('userType') != 'Administrator' && store.state.user.username != to.params.usernameIn) {
            next(false)
            return
        }
    }
    if (to.name == 'Patients') {
        if (sessionStorage.getItem('userType') == 'Patient') {
            next(false)
            return
        }
    }
    if (to.name == 'EditPatient') {
        if (sessionStorage.getItem('userType') == 'Patient' && store.state.user.username != to.params.usernameIn) {
            next(false)
            return
        }
    }
    if (to.name == 'NewPatient') {
        if (sessionStorage.getItem('userType') == 'Patient') {
            next(false)
            return
        }
    }
    if (to.name == 'BiomedicalIndicators') {
        if (sessionStorage.getItem('userType') == 'Patient') {
            next(false)
            return
        }
    }
    //ONLY ADMINS CAN CREATE NEW INDICATORS
    if (to.name == 'NewBiomedicalIndicator') {
        if (sessionStorage.getItem('userType') != 'Administrator') {
            next(false)
            return
        }
    }
    if (to.name == 'EditBiomedicalIndicator') {
        if (sessionStorage.getItem('userType') == 'Patient') {
            next(false)
            return
        }
    }


    /*




    */



    next()



})




export default router
