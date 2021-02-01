
import { OrdenaPosicaoDeUmArray } from "../assets/uteis"

export const state = () => ({
        ListaSubCategorias:null,
        
        
  })

  export const mutations = {
      SET_SubCategorias(state,subcategorias){ 
        state.ListaSubCategorias = subcategorias
        state.ListaSubCategorias.sort(OrdenaPosicaoDeUmArray);
      },
      SET_OrdenaSubCategorias(state){
        state.ListaSubCategorias.sort(OrdenaPosicaoDeUmArray);
      },
      SET_PosicaoSubCategorias(state,params){
        var indx = state.ListaSubCategorias.findIndex(item => item.idsubcategoria === params.idsubcategoria);
        if (indx > -1) {
          state.ListaSubCategorias[indx].posicao = params.posicao
         // console.log("ATUALIZOU SET SET_PosicaoSubCategorias = ",params.idsubcategoria);
        }
       
        
        
      },
      SET_TituloSubCategorias(state,params){
        var indx = state.ListaSubCategorias.findIndex(item => item.idsubcategoria === params.idsubcategoria);
        if (indx > -1) {
          state.ListaSubCategorias[indx].subcategoria = params.subcategoria
          console.log("ATUALIZOU SET SET_TituloSubCategorias = ",params.subcategoria);
        }
      },
      POST_TituloSubCategorias(state,params){
        state.ListaSubCategorias.push(params)
      },
      DELETE_TituloSubCategorias(state,params){
        var indx = state.ListaSubCategorias.findIndex(item => item.idsubcategoria === params.idsubcategoria);
        if (indx > -1) {
          state.ListaSubCategorias.splice(indx, 1);
          console.log("DELETOU titulo sub-categ = ",params.idsubcategoria);
        }
      },
      
      
  }

export const actions = {

  async PopulaSubCategoriasSite({commit},params) {
            let RespPadrao = {}
            //let caminho = this.$axios.defaults.baseURL + "/padrao"   
            let caminho = this.$axios.defaults.baseURL + "/padrao"   
            let instrucao = "SELECT idsubcategoria,idcategoria,subcategoria,posicao FROM subcategsite WHERE idsiteconfig = " + params.idsiteconfig + ";"
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",0); // 0 =select 1,2,3 insert,update,delete
           
            let  resp = await this.$axios.put(caminho,formData)
            if (resp.status === 200) {
                
                commit('SET_SubCategorias',resp.data.dados)
                RespPadrao.Erro = false;
                
                return RespPadrao
            }  else {
                RespPadrao.Erro = true;
                RespPadrao.msgErro = 'error popular subcategorias'
                console.log("error popular subcategorias", err);

                return RespPadrao
            }  
    
     
  },
  async CommitSubCategoria({commit},params) {
      
    commit('SET_SubCategorias',params.dados)
  },
  async AtualizaPosicaoSubCategorias({commit},params) {
    
            let RespPadrao = {}
            let caminho = this.$axios.defaults.baseURL + "/padrao"   
           // console.log('Inicio atualização => ');
          
            const eArr = params.subcategorias[Symbol.iterator]();
          
            let cont = 0;
            for (let elem of eArr) {
                    cont = cont + 1;
                    
                    let instrucao = "UPDATE subcategsite SET posicao = " + cont + " WHERE idsubcategoria =" + elem.idsubcategoria + ";";    
                    let formData = new FormData()             
                    formData.append("instrucaoSQL",instrucao);
                    formData.append("tipoInstrucao",2); // 0 =select 1,2,3 insert,update,delete
                    try {
                          let  resp = await this.$axios.put(caminho,formData)
                          if (resp.status === 200) {
                              var paramsCateg = {idsubcategoria:elem.idsubcategoria,posicao:cont}
                              commit('SET_PosicaoSubCategorias',paramsCateg)
                          }
                      }catch (err) {
                        console.log("error atualizar posição subcategorias", err);
                      }    
                     
                    if (cont === params.subcategorias.length) {
                      console.log("ORDENOU posição => ",cont);   
                      commit('SET_OrdenaSubCategorias')
                      
                     }
            }

           // commit('SET_OrdenaSubCategorias')

            
    

  },
  async AtualizaSubCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('params AtualizaCategoria => ',params);
              
            
            let instrucao = "UPDATE subcategsite SET subcategoria = '" + params.subcategoria + "' WHERE idsubcategoria =" + params.id + ";";    
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",2); // 0 =select 1,2,3 insert,update,delete
            let  resp = await this.$axios.post(caminho,formData)
            if (resp.status === 200) {
                var paramsCateg = {idsubcategoria:params.id,subcategoria:params.subcategoria}
                commit('SET_TituloSubCategorias',paramsCateg)
                RespPadrao.Erro = false;
                RespPadrao.id = params.id;
                return RespPadrao
            }  else {
                RespPadrao.Erro = true;
                RespPadrao.msgErro = 'Erro ao atualizar título subcategoria'
                console.log("Erro ao atualizar título subcategoria", err);

                return RespPadrao
            }  
         
  },
  async InsereSubCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('Inicio inserção => ');
              
            
            let instrucao = "INSERT INTO subcategsite (subcategoria,idcategoria) VALUES('" + params.subcategoria +  "', " + params.idcategoria + ");";
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",1); // 0 =select 1,2,3 insert,update,delete
            let resp = await this.$axios.post(caminho,formData);
            if (resp.status === 200) {
              console.log("resp inserção : ", resp.data.dados);
              var paramsCateg = {idsubcategoria:resp.data.dados.insertId,
                                idcategoria:params.idcategoria,
                                subcategoria:params.subcategoria,
                                posicao:2000}

              commit('POST_TituloSubCategorias',paramsCateg)

              RespPadrao.Erro = false;
              RespPadrao.id = resp.data.dados.insertId;
              RespPadrao.posicao = 2000;
              return RespPadrao
            } else {
              RespPadrao.Erro = true;
              RespPadrao.msgErro = 'Erro ao inserir título subcategoria'
              console.log("Erro ao inserir título subcategoria", err);

              return RespPadrao
           };
  
  },
  async ExcluiSubCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('Inicio atualização => ');
         
                
            let instrucao = "DELETE FROM subcategsite WHERE idsubcategoria=" + params.id + ";";
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",3); // 0 =select 1,2,3 insert,update,delete
            let resp = await this.$axios.post(caminho,formData);
            if (resp.status === 200) {
                  console.log("resp exclusão : ", resp);
                  var paramsCateg = {idsubcategoria:params.id}
                  commit('DELETE_TituloSubCategorias',paramsCateg)
                  RespPadrao.Erro = false;
                  RespPadrao.id = params.id;
                  return RespPadrao
                } else {
                  RespPadrao.Erro = true;
                  RespPadrao.msgErro = 'Erro ao excluir título subcategoria'
                  console.log("Erro ao excluir título subcategoria", err);

                  return erro
              };
  
  },
  
    
}


 