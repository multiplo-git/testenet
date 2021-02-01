<template>
  <section class="container">
    <div>
     
    </div>
  </section>
</template>

<script>
//import AppLogo from '~/components/AppLogo.vue'
const config = require('../nuxt.config.js')

export default {

  async fetch() {
    //this.planets = await fetch('https://api.nuxtjs.dev/planets').then(res =>
   //   res.json()
   // )
            
            
            var caminho = this.$axios.defaults.baseURL + "/padrao/"   
            var instrucaoCateg = "SELECT idcategoria,categoria,posicao FROM categsite WHERE idsiteconfig = " + this.$store.state.global.idSiteConfig + ";"
            
            var  resp = await this.$axios.get(`${caminho}${instrucaoCateg}`)
            if (resp.status === 200) {
                var params = {dados:resp.data.dados}
                this.$store.dispatch('stCategoriasSite/CommitCategoria',params) //.then(function(obj) { })
              //  console.log('v.CategoriasSite dispatch -====., ',this.$store.state.stCategoriasSite.ListaCategorias)
                
                var instrucaoSubCateg = "SELECT idsubcategoria,idcategoria,subcategoria,posicao FROM subcategsite WHERE idsiteconfig = " + this.$store.state.global.idSiteConfig + ";"
                var respSubCat = await this.$axios.get(`${caminho}${instrucaoSubCateg}`)
                if (respSubCat.status === 200) {
                    var params = {dados:respSubCat.data.dados}
                    this.$store.dispatch('stSubCategoriasSite/CommitSubCategoria',params) //.then(function(obj) { })
                  //  console.log('v.ListaSubCategorias dispatch -====., ',this.$store.state.stSubCategoriasSite.ListaSubCategorias)
                }  
             }  

            
            

     

  },
  //fetchOnServer: false,  // deixar ativa  para executar local
  components: {
    
  },
  data() {
        return {
         
          idCategoria:0,
        }
  }, // data
  methods: {
          
        PopulaSubCategorias() {

                                 
                    let v = this
                    let params = {idsiteconfig:this.$store.state.global.idSiteConfig}
                    console.log('popula sub-categ  -====this.$store.state.global.idSiteConfig =  ',this.$store.state.global.idSiteConfig)
                        
                      this.$store.dispatch('stSubCategoriasSite/PopulaSubCategoriasSite',params).then(function(obj) {
                          //console.log('PopulaSubCategoriasSite depois-====., ',v.$store.state.stSubCategoriasSite.ListaSubCategorias)
                          //if (v.$store.state.stSubCategoriasSite.ListaSubCategorias !== undefined) {
                              return obj                                  
                         // }

                         // console.log('v.SubCategoriasSite nossos servicos cad categoria null -====., ',v.$store.state.stSubCategoriasSite.ListaSubCategorias)
                      });
                
          }
       
  },
  mounted(){
        let v = this
        let params = {idsiteconfig:1}
                        
        this.$store.dispatch('global/AtualizaSiteConfig',params).then(function(obj) {
            console.log('Atualizou v.$store.state.global.idSiteConfig : ', v.$store.state.global.idSiteConfig)
        })


        console.log('ENV idsitepadraoenv : ', process.env.idsitepadraoenv)
        console.log('ENV idsitepadrao env produção : ', this.$config.idsitepadraoenv)
        if (config.dev) {
              console.log('Confi.dev ok : ', config.dev)
        }
        else {
          console.log('Confi.dev false : ', config.dev)
        }

       /* if ( this.$store.state.stCategoriasSite.ListaCategorias === null) {
             let v = this
             let params = {idsiteconfig:this.$store.state.global.idSiteConfig}
              this.$store.dispatch('stCategoriasSite/PopulaCategoriasSite',params).then(function(obj) {
                                    
                  if (v.$store.state.stCategoriasSite.ListaCategorias.length > 0) {
                        
                        v.PopulaSubCategorias(); 
                  }
                  console.log('v.CategoriasSite nossos servicos cad categoria null -====., ',v.$store.state.stCategoriasSite.ListaCategorias)
              });
         } */
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>

