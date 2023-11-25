
const dataAtual = new Date()

function calcParcela(principal,taxa,numParcelas){
    let r = taxa / 100
    let prestacao = principal * (r * Math.pow(1+r, numParcelas)) / ( Math.pow(1 + r, numParcelas)-1)

    return prestacao.toFixed(2)
}

function gerarTabelaPrice(principal,taxa,numParcelas){
    let tabela = []
    let saldoDevedor = principal
    let r = taxa / 100

    for(let i = 1; i <= numParcelas ; i++){
        let juros = saldoDevedor * r;
        let amortizacao = calcParcela(principal,taxa,numParcelas) - juros;

        saldoDevedor -= amortizacao

        tabela.push({
            periodo: i,
            prestacao: calcParcela(principal,taxa,numParcelas).replace('.',','),
            juros: juros.toFixed(2).replace('.',','),
            amortizacao: amortizacao.toFixed(2).replace('.',','),
            saldoDevedor: saldoDevedor.toFixed(2).replace('.',',')
        })
    }

    return tabela
}

function gerarId(){        
    let resultado = ''
    const caracteres = 'abcde0123456789'
    for(let i = 0; i < 5; i++){
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }

    return resultado
}
function atualizaLs(item,array){
    if(item === 'coincontrol')localStorage.setItem(item, JSON.stringify(array))
    if(item === 'aplicacoes')localStorage.setItem(item, JSON.stringify(array))
    if(item === 'emprestimos')localStorage.setItem(item, JSON.stringify(array))
    if(item === 'feriados')localStorage.setItem(item, JSON.stringify(array))
}
function formatarDataParaString(data) {
    const [ano,mes,dia] = data.split('-')

    return `${dia}/${mes}/${ano}`;
}
function maskNumber(numero){
    let [parteInteira, parteDecimal] = numero.split(',')
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    parteDecimal = parteDecimal ? ',' + parteDecimal.padEnd(2, '0') : ',00';
    return parteInteira + parteDecimal;
}

Vue.component('emprestimo-secao',{
    data : function(){
        return {
            emprestimos : [],
            idEmprestimo : '',
            nomeEmprestimo : '',
            valorEmprestimo : '',
            prazoEmprestimo : '',
            dataContratacao : '',
            taxaEmprestimo : '',
            showFooter : false,
            tabelaPrice : [],
            showTabela : false
        }
    },
    methods : {
        lancamento(){
            const id = gerarId()

            return {
                id,
                nome : this.nomeEmprestimo,
                valor : this.valorEmprestimo,
                prazo : this.prazoEmprestimo,
                taxa : this.taxaEmprestimo,
                data : this.dataContratacao
            }
        },
        addLancamento(){
            console.log('click')
            if(!this.nomeEmprestimo){
                document.getElementById('nomeEmprestimo').focus()
                return
            }
            if(!this.valorEmprestimo){
                document.getElementById('valorEmprestimo').focus()
                return
            }
            if(!this.prazoEmprestimo){
                document.getElementById('prazoEmprestimo').focus()
                return
            }
            const dado = this.lancamento()
            this.emprestimos.push(dado)
            atualizaLs('emprestimos', this.emprestimos)
            this.nomeEmprestimo = ''
            this.valorEmprestimo = ''
            this.prazoEmprestimo = ''
            this.taxaEmprestimo = ''
            this.dataContratacao = ''
        },
        verificaDigitado(e){
            let inputValue = e.target.value

            inputValue = inputValue.replace(/[^0-9,]/g, '');
            console.log(inputValue);
            e.target.value = inputValue
        },
        excluiLancamento(e){
            const target = e.target.parentElement.parentElement
            const id = target.getAttribute('id')
            this.idEmprestimo = id
            const novaLista = 
                this.emprestimos.filter(item => item.id !== this.idEmprestimo)
            this.emprestimos = novaLista
            atualizaLs('emprestimos', novaLista)
        },
        tabelaPriceGera(e){
            const target = e.target.parentElement.parentElement
            const id = target.getAttribute('id')
            this.idEmprestimo = id
            this.emprestimos.forEach(item =>{
                if(item.id == id){
                    this.nomeEmprestimo = item.nome
                    this.valorEmprestimo = parseFloat(item.valor.replace(',','.'))
                    this.taxaEmprestimo = parseFloat(item.taxa.replace(',','.'))
                    this.prazoEmprestimo = parseInt(item.prazo)
                    this.dataContratacao = item.data
                }
            })
            const tabela = gerarTabelaPrice(this.valorEmprestimo,this.taxaEmprestimo,this.prazoEmprestimo)
            this.tabelaPrice = tabela
            this.showTabela = true
        }
    },
    template : `
    <div class="w-full">
        <footer :class="{cfooterShow: showFooter}" class="fixed w-full flex flex-col gap-2 justify-center items-center bg-gradient f-escondidoEmp f-shadow">
            <div :class="{topBtnEmp: !showFooter}" class="absolute right-0 top-n">
                <button @click="showFooter = true" v-show="!showFooter" class="mr-1 p-3 rounded-50 border-none flex items-center cursor-pointer btn-shadown bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>
                <button 
                    @click="addLancamento"
                    v-show="showFooter" 
                    class="mr-1 p-3 rounded-50 border-none flex items-center cursor-pointer btn-shadown bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="blue" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>
            </div>
            <button
                @click="showFooter = false"
                v-show="showFooter" 
                class="rounded-50 border-none flex items-center cursor-pointer bg-transparent absolute top-0 left-0"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            <h4 class="text-center m-2">Adicionar</h4>
            <p>
                Nome
                <input type="text" id="nomeEmprestimo" v-model="nomeEmprestimo">
            </p>
            <p>
                Valor
                <input @input="verificaDigitado" type="text" id="valorEmprestimo" v-model="valorEmprestimo">
            </p>
            <p>
                Prazo
                <input type="number" id="prazoEmprestimo" v-model="prazoEmprestimo"
                style="width: 80px;"
                >
            </p>
            <p>
                Taxa
                <input 
                    @input="verificaDigitado" 
                    type="text" 
                    id="taxaEmprestimo" 
                    v-model="taxaEmprestimo"
                    style="width: 50px;"
                >
            </p>
            <p style="margin-bottom: 8px;">
                Data contratação
                <input type="date" name="" id="" v-model="dataContratacao">
            </p>
        </footer>
        <h4 v-show="!showTabela" class="text-center m-2 text-xl">{{emprestimos.length ? 'Empréstimos cadastrados' : 'Sem empréstimos cadastrados'}}</h4>
        <ul v-show="!showTabela" class="flex flex-col items-center justify-center gap-5 w-full">
            <li
                v-bind:id="emprestimo.id"
                v-for="emprestimo in emprestimos" 
                class="p-2 b-shadown-y2 rounded text-xl text-center relative bg-white w-90">
                <strong>{{emprestimo.nome}}</strong>  <br>
                Valor : R$ {{maskNumber(emprestimo.valor)}} <br>
                Prazo : {{emprestimo.prazo}} <br>
                Taxa : {{emprestimo.taxa}}% <br>
                Data da contratação: {{emprestimo.data ? formatarDataParaString(emprestimo.data) : '--/--/--'}}
                <div class="absolute right-0 top-0 flex flex-col">
                    <button @click="excluiLancamento" 
                        class="border-none bg-transparent cursor-pointer m-1 trash">
                    </button>
                    <button @click="tabelaPriceGera" 
                        class="border-none bg-transparent cursor-pointer m-1 table">
                    </button>
                </div>
            </li>
        </ul>
        <div class="relative" v-show="showTabela" style="padding-bottom: 75px">
            <button @click="showTabela = false" 
                class="absolute right-0 border-none bg-transparent"
                style="margin-right: 10px"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
            </button>
            <h4 class="text-center" style="margin-bottom: 10px">Tabela {{nomeEmprestimo}}</h4>
            <table class="w-90 m-auto text-center">
                <thead>
                    <th>Nº</th>
                    <th>Prestação</th>
                    <th>Juros</th>
                    <th>Amortização</th>
                    <th>Saldo Devedor</th>
                </thead>
                <tbody>
                    <tr v-for="linha in tabelaPrice">
                        <td>{{linha.periodo}}</td>
                        <td>{{maskNumber(linha.prestacao)}}</td>
                        <td>{{maskNumber(linha.juros)}}</td>
                        <td>{{maskNumber(linha.amortizacao)}}</td>
                        <td>{{maskNumber(linha.saldoDevedor)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>    
    </div> 
    `,
    mounted(){
        this.emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || []
    }
})

new Vue({
    el: "#app",
    data : {
        showMenu : false,
        mesString : [
            'janeiro',
            'fevereiro',
            'março',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro'
        ],
        id : '',
        ano : dataAtual.getFullYear(),
        mesIndice : dataAtual.getMonth(),
        mes : '',
        dia : dataAtual.getDate(),
        descricao : '',
        valor : '',
        tipo : 'c',
        saldo : 0,
        contas : [],
        contaSelecionada : [],
        btnHeader : 'Extrato',
        showExtrato: true,
        showTabela: true,
        showFooter : false,
        showModalExtrato : false,
        aplicacoes : [],
        showAplicacao : false,
        showFooterAplicacao : false,
        idAplicacao : '',
        nomeAplicacao : '',
        descricaoAplicacao : '',
        valorAplicacao : '',
        totalAplicados : '0,00',
        dataAplicacao : '',
        showEmprestimo : false,
        cdi : '',
        historicoCdi : [],
        feriados : []
    },
    methods : {
        menuBtnExtrato(){
            this.showExtrato = true
            this.showAplicacao = false
            this.showEmprestimo = false
        },
        menuBtnAplicacao(){
            this.showExtrato = false
            this.showAplicacao = true
            this.showEmprestimo = false
        },
        menuBtnEmprestimo(){
            this.showExtrato = false
            this.showAplicacao = false
            this.showEmprestimo = true
        },
        formatarNumero(numero){
            let [parteInteira, parteDecimal] = numero.split(',')
            parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            parteDecimal = parteDecimal ? ',' + parteDecimal.padEnd(2, '0') : ',00';
            return parteInteira + parteDecimal;
        },
        incrementarDia(){
            this.dia == '31' ? this.dia = 1 : this.dia++ 
        },
        decrementarDia(){
            this.dia == 1 ? this.dia = 31 : this.dia--
        },
        mesAnterior(){
            // this.mesIndice--
            if(this.mesIndice <= 0 ){
                this.mesIndice = 11
                this.ano--  
            }else{
                this.mesIndice--
            }  
            this.atualizaConta()
            this.clearData()
        },
        mesProximo(){
            if(this.mesIndice >= 11){
                this.mesIndice = 0
                this.ano++
            }else{
                this.mesIndice++
            }
            this.atualizaConta()
            this.clearData()
        },
        footerShow(){
            this.showFooter = true
        },
        footerClose(){
            this.showFooter = false
        },
        gerarId(){        
            let resultado = ''
            const caracteres = 'abcde0123456789'
            for(let i = 0; i < 5; i++){
                resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
            }

            return resultado
        },
        lancamento(){
            const idGera = this.gerarId()
            return {
                id : idGera,
                ano : this.ano,
                mes : this.mesIndice,
                dia : this.dia,
                descricao : this.descricao,
                valor : this.valor,
                tipo : this.tipo
            }
        },
        aplicacao(){
            const id = this.gerarId()

            return{
                id : id,
                nome : this.nomeAplicacao,
                descricao: this.descricaoAplicacao,
                valor : this.valorAplicacao,
                data : this.dataAplicacao
            }
        },
        atualizaLs(item){
            if(item === 'coincontrol')localStorage.setItem(item, JSON.stringify(this.contas))
            if(item === 'aplicacoes')localStorage.setItem(item, JSON.stringify(this.aplicacoes))
            if(item === 'emprestimos')localStorage.setItem(item, JSON.stringify(this.emprestimos))
        },
        addLancamento(){
            if(!this.descricao){
                document.getElementById('descricao').focus()
                return
            }
            if(!this.valor){
                document.getElementById('valor').focus()
                return
            }
            const dado = this.lancamento()
            this.contas.push(dado)
            this.atualizaLs('coincontrol')
            this.atualizaConta()
            this.descricao = ''
            this.valor = ''
            this.tipo = 'c'
        },
        addAplicacao(){
            if(!this.nomeAplicacao){
                document.getElementById('nomeAplicacao').focus()
                return
            }
            if(!this.descricaoAplicacao){
                document.getElementById('descricaoAplicacao').focus()
                return
            }
            if(!this.valorAplicacao){
                document.getElementById('valorAplicacao').focus()
                return
            }
            const dado = this.aplicacao()
            this.aplicacoes.push(dado)
            this.atualizaLs('aplicacoes')
            this.atualizaAplicacoes()
            this.descricaoAplicacao = ''
            this.valorAplicacao = ''
            this.nomeAplicacao = ''  
        },
        filtrarLista(){
            if(this.contas.length){
                this.contaSelecionada = 
                    this.contas.filter((item)=> item.ano === this.ano && item.mes === this.mesIndice)
                this.contaSelecionada.sort((a,b)=> a.dia - b.dia)
            }else{
                this.contaSelecionada = []
            }
        },
        mapDescricao(desc){
            const arrayValor = 
                this.contaSelecionada.map(item => item.descricao === desc ? this.parseValor(item.valor) : 0)
            
            return arrayValor
        },
        mapTipo(tp){
            const arrayValor = 
                this.contaSelecionada.map(item => item.tipo === tp ? this.parseValor(item.valor) : 0)
            
            return arrayValor
        },
        totaisConta(array){
            const soma =
                array.reduce((acumulador, elemento)=>{
                return acumulador + elemento
            },0)

            return soma.toFixed(2)
        },
        totalAplicado(){
            const arrayValor =
                this.aplicacoes.map(item => parseFloat(item.valor.replace(',','.')))
            
            const soma = this.totaisConta(arrayValor)

            return soma.replace('.',',')
        },
        atualizaConta(){
            this.filtrarLista()
            this.saldo = this.saldoMes()
        },
        atualizaAplicacoes(){
            this.aplicacoes = JSON.parse(localStorage.getItem('aplicacoes')) || []
            this.totalAplicados = this.totalAplicado()
        },
        parseValor(valor){
            if(valor.includes('.')) valor.replace('.','')
            valor = valor.replace(',','.')
            return parseFloat(valor)
        },
        clearData(){
            this.id = ''
            this.descricao = ''
            this.valor = ''
            this.tipo = 'c'
        },
        cancelarAlteracao(){
            this.clearData()
            this.showModalExtrato = false
            this.showFooter = false
        },
        selecionaTr(e){
            this.showFooter = false
            this.habilitaBtnEditar = true
            const target = e.target.parentElement
            this.showModalExtrato = true;
            this.id = target.getAttribute('id')
            this.contas.forEach(item =>{
                if(item.id == this.id){
                    this.dia = item.dia
                    this.descricao = item.descricao
                    this.valor = item.valor
                    this.tipo = item.tipo
                }
            })
        },
        deletarAplicacao(e){
            const target = e.target.parentElement.parentElement
            console.log(target);
            const id = target.getAttribute('id')
            this.idAplicacao = id
            const aplicacoesUpdate =
                this.aplicacoes.filter(item => item.id !== this.idAplicacao)
            this.aplicacoes = aplicacoesUpdate
            this.atualizaLs('aplicacoes')
            this.atualizaAplicacoes()
        },
        excluirElemento(){
            const novaLista = this.contas.filter(item => item.id !== this.id)
            this.contas = novaLista
            this.atualizaLs('coincontrol')
            this.atualizaConta()
            this.clearData()
            this.showModalExtrato = false
        },
        alteraElemento(){
            this.addLancamento()
            this.excluirElemento()
        },
        saldoMes(){
            const totalDebitoArray = this.mapTipo('d')
            const totalCreditoArray = this.mapTipo('c')
            const totalDebito = this.totaisConta(totalDebitoArray)
            const totalCredito = this.totaisConta(totalCreditoArray)
            const saldo =  totalCredito - totalDebito
            return saldo.toFixed(2).replace('.',',')
        },
        formatarDataParaString(data) {
            const [ano,mes,dia] = data.split('-')

            return `${dia}/${mes}/${ano}`;
        },
        calculaAplicacaoCdi(cdi, percentual = 100,valor){
            let i = cdi/percentual
            let rendimento = i*valor
            let valorAtualizado = valor + rendimento
            return valorAtualizado
        },
        calculaDesdeAplicacao(aplicacao, percentual){
            
            const [ano,mes,dia] = aplicacao.data.split('-')
            // const [ano,mes,dia] = this.aplicacoes[0].data.split('-')
            const dataAplicacao = `${dia}/${mes}/${ano}`
            let indiceSeleciona
            this.historicoCdi.forEach((item,indice) => {
                if(item.data == dataAplicacao)indiceSeleciona = indice 
            })
            let periodoArray = this.historicoCdi.slice(indiceSeleciona)
            let valorIncial = parseFloat(aplicacao.valor.replace(',','.'))
            periodoArray.forEach(item => valorIncial = this.calculaAplicacaoCdi(item.valor,percentual,valorIncial))
            
            return valorIncial.toFixed(2).replace('.',',')
        }
    },
    mounted(){
        this.mes = this.mesString[this.mesIndice]
        this.contas = JSON.parse(localStorage.getItem('coincontrol')) || []
        this.feriados = JSON.parse(localStorage.getItem('feriados')) || []
        this.atualizaConta()
        this.atualizaAplicacoes()
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json')
            .then(resp => resp.json())
            .then(resp => {
                if(resp.length > 0){
                    this.historicoCdi = resp
                    this.cdi = resp[resp.length-1]
                }
            })
        try {
            fetch(`https://api.invertexto.com/v1/holidays/${this.ano}?token=5474|bFqL4xrZghHzvJe4qpOQPokZS6SeOtrp`)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error(`Erro na requisição: ${resp.status}`);
                    }
                    return resp.json();
                })
                .then(data => {
                    this.feriados = data
                    atualizaLs('feriados', this.feriados)
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
            
    }
})