
export const state = () => ({
    
    idSiteConfig:1,
    
    
})

export const mutations = {
    SET_SiteConfig(state,idsiteconfig){
      state.idSiteConfig = idsiteconfig
     
    }
}


export const actions = {
    async AtualizaSiteConfig({commit},params) {
        let RespPadrao = {erro:false}
        commit('SET_SiteConfig',params.idsiteconfig)
        return RespPadrao

    }
}