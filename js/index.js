const dataAtual = new Date()

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
}
function formatarDataParaString(data) {
    const [ano,mes,dia] = data.split('-')

    return `${dia}/${mes}/${ano}`;
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
            showFooter : false
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
        }

    },
    template : `
    <div>
    <footer :class="{cfooterShow: showFooter}" class="fixed w-full flex flex-col gap-2 justify-center items-center bg-gradient f-escondidoAp">
        <div :class="{topBtn: !showFooter}" class="absolute right-0 top-n">
            <button @click="showFooter = true" v-show="!showFooter" class="mr-1 p-3 rounded-50 border-none flex items-center cursor-pointer btn-shadown bg-gradient">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
            <button 
                @click="addLancamento"
                v-show="showFooter" 
                class="mr-1 p-3 rounded-50 border-none flex items-center cursor-pointer btn-shadown bg-gradient">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="yellow" class="bi bi-check-lg" viewBox="0 0 16 16">
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
            <input type="number" id="prazoEmprestimo" v-model="prazoEmprestimo">
        </p>
        <p>
            Taxa
            <input @input="verificaDigitado" type="text" id="taxaEmprestimo" v-model="taxaEmprestimo">
        </p>
        <p style="margin-bottom: 8px;">
            Data aplicação
            <input type="date" name="" id="" v-model="dataContratacao">
        </p>
    </footer>
        <h4 class="text-center m-2 text-xl">{{emprestimos.length ? 'Empréstimos cadastrados' : 'Sem empréstimos cadastrados'}}</h4>
        <ul class="m-2 w-90 flex flex-col gap-5">
        <li
            v-bind:id="emprestimo.id"
            v-for="emprestimo in emprestimos" 
            class="p-2 b-shadown-y2 rounded text-xl text-center relative">
            <strong>{{emprestimo.nome}}</strong>  <br>
            Valor : R$ {{emprestimo.valor}} <br>
            Prazo : {{emprestimo.prazo}} <br>
            Taxa : {{emprestimo.taxa}}% <br>
            Data da contratação : {{emprestimo.data ? formatarDataParaString(emprestimo.data) : '--/--/--'}}
            <div class="absolute right-0 top-0 flex flex-col">
                <button @click="excluiLancamento" 
                    class="border-none bg-transparent cursor-pointer m-1 trash">
                </button>
            </div>
        </li>
        </ul>    
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
    },
    methods : {
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
        selecionaBtnHeader(e){
            const target = e.target
            const innerTextBtn = target.innerText
            this.btnHeader = innerTextBtn
            this.btnHeader !== 'Extrato' ? this.showExtrato = false : this.showExtrato = true
            this.btnHeader === 'Aplicações' ? this.showAplicacao = true : this.showAplicacao = false
            this.btnHeader === 'Empréstimos' ? this.showEmprestimo = true : this.showEmprestimo = false
            this.showMenu = false
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
        }
    },
    mounted(){
        this.mes = this.mesString[this.mesIndice]
        this.contas = JSON.parse(localStorage.getItem('coincontrol')) || []
        this.atualizaConta()
        this.atualizaAplicacoes()
    }
})