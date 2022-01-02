import {createStore} from 'vuex'
import axios from 'axios'


export default createStore({

    state: {
        user: null,
    },
    mutations: {
        resetUser(state) {
            if (state.user) {
                state.user = null
            }

        },
        setUser(state, loggedInUser) {
            state.user = loggedInUser
        },
        resetVcard(state) {
            state.vcard = null
        },
        setVcard(state, userVcard) {
            state.vcard = userVcard
        },

        resetCategories(state) {
            state.categories = []
        },
        setCategories(state, cats) {
            state.categories = cats
        },
        resetPaymentTypes(state) {
            state.paymentTypes = []
        },
        setPaymentTypes(state, cats) {
            state.paymentTypes = cats
        },
        insertCategory(state, newCategorie) {
            state.categories.push(newCategorie)
        },
        updateCategory(state, updateCategory) {
            let idx = state.categories.findIndex((t) => t.id === updateCategory.id)
            if (idx >= 0) {
                state.categories[idx] = updateCategory
            }
        },
        deleteCategory(state, deleteCategory) {
            let idx = state.categories.findIndex((t) => t.id === deleteCategory.id)
            if (idx >= 0) {
                state.categories.splice(idx, 1)
            }
        },
        insertNotification(state, notification) {
            state.notifications.push(notification)
        },
        deleteNotification(state, index) {
            console.log(index)
            //this array as no id by default, so we need to receive its index
            if (index >= 0 && index < state.notifications.length) {
                state.notifications.splice(index, 1)
            }
        },
        resetNotifications(state) {
            state.notifications = []
        },

    },

    getters: {
        categories: (state) => {
            return state.categories
        },
        totalCategories: (state) => {
            return state.categories.length
        },
        categoriesFilter: (state) => (type, name) => {
            return state.categories.filter(p =>
                ((!type || type == p.type) && p.name.toLowerCase().includes(name.toLowerCase()))
            )
        },
        totalCategoriesFilter: (state, getters) => (type, name) => {
            return getters.categoriesFilter(type, name).length
        },
        categoriesFilteredByType: (state) => (transactionType) => {
            return state.categories.filter(c => (transactionType === c.type))
        },
        paymentTypes: (state) => {
            return state.paymentTypes
        },
        notifications : (state) => {
            return state.notifications
        },
        totalNotifications : (state) => {
            if(state.notifications) {
                return state.notifications.length
            }

        },

    },

    actions: {
        async login(context, credentials) {
            try {
                let response = await axios.post('auth/login', credentials)
                axios.defaults.headers.common.Authorization =
                    "Bearer " + response.data.token
                sessionStorage.setItem('token', response.data.token)
                response = await axios.get('auth/user')
                context.commit('setUser', response.data)
                sessionStorage.setItem('userType', response.data.userType)


            } catch (error) {
                delete axios.defaults.headers.common.Authorization
                sessionStorage.removeItem('token')
                context.commit('resetUser', null)
                throw error
            }
        },
        async loadLoggedInUser(context) {
            try {
                let response = await axios.get('/auth/user')
                context.commit('setUser', response.data)
            } catch (error) {
                delete axios.defaults.headers.common.Authorization
                context.commit('resetUser', null)
                throw error
            }
        },

        async logout(context, isDeleted = false) {
            try {
                if(!isDeleted){
                    await axios.post('logout')
                }
            } finally {
                delete axios.defaults.headers.common.Authorization
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user_type')
                context.commit('resetUser', null)
                context.commit('resetVcard', null)
                context.commit('resetCategories', null)
                context.commit('resetPaymentTypes', null)
                context.commit('resetNotifications', null)
            }
        },
        async restoreToken (context) {
            let storedToken = sessionStorage.getItem('token')
            if (storedToken) {
                axios.defaults.headers.common.Authorization = "Bearer " + storedToken
                return storedToken
            }
            else {
                delete axios.defaults.headers.common.Authorization
                context.commit('resetUser')
                return null
            }

        },

        async SOCKET_askForMoney (context, askMoneyMsg) {
            this.$toast.info(`${askMoneyMsg.source_phone} just set you a money request of ${askMoneyMsg.amount} : ${askMoneyMsg.msg}`)
            askMoneyMsg.type = "Request"

            context.commit('insertNotification', askMoneyMsg)
        },
        async deleteNotification(context, idx) {
            context.commit('deleteNotification', idx)
        },

        async loadCategories(context) {
            try {
                if(!this.state.vcard)
                    return
                let response = await axios.get('vcards/' + this.state.vcard.phone_number + '/categories')
                context.commit('setCategories', response.data.data)
                return response.data.data
            } catch (error) {
                context.commit('resetCategories', null)
                throw error
            }
        },
        async loadPaymentTypes(context) {
            try {
                let response = await axios.get('payment/types')
                context.commit('setPaymentTypes', response.data.data)
                return response.data.data
            } catch (error) {
                context.commit('resetPaymentTypes', null)
                throw error
            }
        },
        async insertCategory(context, category) {
            let response = await axios.post('vcards/' + this.state.vcard.phone_number + '/categories', category)
            context.commit('insertCategory', response.data.data)
            return response.data.data
        },
        async updateCategory(context, category) {
            let response = await axios.put('vcards/' + this.state.vcard.phone_number + '/categories/' + category.id, category)
            context.commit('updateCategory', response.data.data)
            console.log(response.data.data)
            return response.data.data
        },
        async deleteCategory(context, category) {
            let response = await axios.delete('vcards/' + this.state.vcard.phone_number + '/categories/' + category.id)
            console.log(response)
            context.commit('deleteCategory', response.data.data)
            return response.data.data;
        },
        async loadDefaultCategories(context) {
            try {
                let response = await axios.get('admin/defaultcategories')
                context.commit('setCategories', response.data.data)
                return response.data.data
            } catch (error) {
                context.commit('resetCategories', null)
                throw error
            }
        },
        async insertDefaultCategory(context, category) {
            let response = await axios.post('admin/defaultcategories', category)
            context.commit('insertCategory', response.data.data)
            return response.data.data
        },
        async updateDefaultCategory(context, category) {
            let response = await axios.put('admin/defaultcategories/' + category.id, category)
            context.commit('updateCategory', response.data.data)
            return response.data.data
        },
        async deleteDefaultCategory(context, category) {
            let response = await axios.delete('admin/defaultcategories/' + category.id)
            context.commit('deleteCategory', response.data.data)
            return response.data.data
        },
        async loadVcard(context) {
            try {
                let response = await axios.get('vcards/' + this.state.user.id)
                context.commit('setVcard', response.data.data)
                return response.data.data
            } catch (error) {
                context.commit('resetVcard', null)
                throw error
            }
        },
        async refreshVcard(context) {
            let vcardPromise = context.dispatch('loadVcard')
            await vcardPromise
        },
        async SOCKET_createTransaction(context, transaction) {
            if (context.state.user && transaction) {
                //Object to save notification in array
                let msgNotification = {}

                if (transaction.type == "External") {
                    //admin credits a vcard
                    if (transaction.receivingVcardNumber == context.state.user.id) {
                        this.$toast.info(`You have received ${transaction.value}€ via ${transaction.paymentType} from ${transaction.sender}`)
                        //update vcard info
                        await context.dispatch('refreshVcard')

                        //Format fields of message
                        msgNotification.type = "External Transaction"
                        msgNotification.msg = `You have received ${transaction.value}€ via ${transaction.paymentType} from ${transaction.sender}`



                    } else {
                        this.$toast.info(`Vcard #${transaction.paymentRef} was credited by an administrator`)
                    }

                } else {
                    this.$toast.info(`You have received ${transaction.value}€ from vcard nº ${transaction.sender}`)
                    await context.dispatch('refreshVcard')


                    //Format fields of message
                    msgNotification.type = "Vcard Transaction"
                    msgNotification.msg = `You have received ${transaction.value}€ from vcard nº ${transaction.sender}`


                }

                msgNotification.source_phone = transaction.sender
                msgNotification.amount = transaction.value
                context.commit('insertNotification', msgNotification)
            }
        },
        async SOCKET_editVcard(context, details) {
            if (context.state.user && details) {
                if (details.id == context.state.user.id) {
                    //update vcard info
                    await context.dispatch('refreshVcard')
                    if (details.type == "block") {
                        if (details.value == 1) {
                            this.$toast.info(`Your vcard was blocked by an administrator. Some of your functionalities will get limited.`)
                        } else {
                            this.$toast.info(`Your vcard was unblocked by an administrator.`)
                        }
                    } else if (details.type == "maxDebit") {
                        this.$toast.info(`Your max debit limit was changed to ${details.value}€ by an administrator`)
                    }
                } else {
                    if (details.type == "block") {
                        if (details.value == 1) {
                            this.$toast.info(`Vcard #${details.id} was blocked by an administrator`)
                        } else {
                            this.$toast.info(`Vcard #${details.id} was unblocked by an administrator`)
                        }
                    } else if (details.type == "maxDebit") {
                        this.$toast.info(`Vcard #${details.id} max debit limit was changed by an administrator`)
                    }
                }
            }
        },
        async SOCKET_deleteVcard(context, vcard) {
            if (context.state.user && vcard) {
                if (vcard.phone_number == context.state.user.id) {
                    this.$toast.info(`Your vcard was deleted by an administrator, you will get logged out soon.`)
                    //logout after 15 seconds. It makes no sens leaving the user logged in after deleting his account
                    setTimeout(() => {
                        //will throw an error because it will try to fetch info from a use that doesn't exist already. Since we logout the user after deleting it from the system
                        context.dispatch('logout')
                    }, 15000)
                } else {
                    this.$toast.info(`Vcard #${vcard.phone_number} was deleted!`)
                }
            }
        },
        async SOCKET_deleteAdmin(context, user) {
            if (context.state.user && user) {
                if (user.id == context.state.user.id) {
                    this.$toast.info(`Your account was deleted by an administrator, you will get logged out soon.`)
                    //logout after 15 seconds.
                    setTimeout(() => {
                        context.dispatch('logout')
                    }, 15000)
                } else {
                    this.$toast.info(`Account #${user.id} (${user.name}) was deleted!`)
                }
            }
        },
        async SOCKET_editAdmin(context, details) {
            if (context.state.user && details) {
                if (details.id == context.state.user.id) {
                    this.$toast.info(`Your user profile has been changed!`)
                } else {
                    this.$toast.info(`User profile ${details.id} (${details.name}) was changed!`)
                }
            }
        },
        async refresh (context) {
            let userPromise = context.dispatch('loadLoggedInUser')
            await userPromise



        },

    },
})