//Oyuncu sınıfını oluşturmak
class Player {
    constructor (lno,name,elo,ukd){
        this.lno = lno;
        this.name = name;
        this.elo = elo;
        this.ukd = ukd;
        this.puan = 0;
        this.info = [this.lno,this.name,this.elo,this.ukd,this.puan];
    }
}



function sira_no(arr){
    for (let i = 0;i<arr.length;i++){
        arr[i].info.unshift(i+1);
    }
}
//oyuncuları içinde barındıran global dizi.
let dizi = [];
//oyuncuların sıra numarası.
let bsno = 1;
function addPlayer(){
    // input bilgilerini almak ve boş olup olmadıklarını kontrol etmek
    let lno = document.querySelector('#Lno');
    let s_name = document.querySelector('#name');
    let elo = document.querySelector('#elo');
    let ukd = document.querySelector('#Ukd');
    if (ukd.value == '' ||  lno.value == '' || elo.value == '' || s_name.value == ''){
        alert('lütfen boş yer bırakmayınız.');
        return;
    }
    
    for (let i of dizi){

        if ( i.lno == lno.value ){
            alert('aynı lno\'ya sahip yarışmacılar olamaz');
            return;
        }
        else if(i.name == s_name.value){
            alert('aynı isime sahip oyuncular olamaz');
            return;
        }
        
    }
    // oluşan yeni oyuncunun bilgilerini bir dizide toplamak
    p = new Player(lno.value,s_name.value,elo.value,ukd.value);
    p.info.unshift(bsno);
    bsno++;
    //oyuncu sınıfını depolamak
    dizi.push(p)

    let i = dizi.length-1;
    // tablo oluşturarak oyuncuları oraya yerleştirmek
    table_row = document.createElement('tr')
    
         for (let x=0;x<=5;x++){
            let table_data = document.createElement('td');
            let content = document.createTextNode(dizi[i].info[x]);
            table_data.appendChild(content);
            table_row.appendChild(table_data);
        }
    
    document.querySelector('table').appendChild(table_row);
    //tablo oluştuktan sonra oyuncu bilgilerini input içerisinden silmek
    lno.value = "";
    s_name.value = "";
    elo.value = "";
    ukd.value = "";

}

// oyuncuların  puanlarına göre ve elolarına göre belirli bir sıraya konulması
function sirala(arr){
    for (let k = 0;k<arr.length;k++){
        //önce puan kontrol edilecek ve puanlar aynı ise elolar'a bakılacak onlar da aynı ise ukd sıralaması yapılacak.
        for (let i=0;i<arr.length-1;i++){
            if (arr[i].puan<arr[i+1].puan){
                let temp = dizi[i+1];
                dizi[i+1] = dizi[i];
                dizi[i] = temp;
            }
            else if (arr[i].puan == arr[i+1].puan){
                if (parseInt(arr[i].elo)<parseInt(arr[i+1].elo)){
                    let temp = dizi[i+1];
                    dizi[i+1] = dizi[i];
                    dizi[i] = temp;
                }
                else if (parseInt(arr[i].elo) == parseInt(arr[i+1].elo)){
                    if (parseInt(arr[i].ukd)<parseInt(arr[i+1].ukd)){
                        let temp = dizi[i+1];
                        dizi[i+1] = dizi[i];
                        dizi[i] = temp;
                    }
                }
            }
        }
    }
    return dizi;
}




// oyunculara renk ataması yapmak.
function renk_belirle(){
    let colors = ['white','black'];
    let randomChoise = Math.floor(Math.random()*2)+1;
    return colors[randomChoise];
}


function shuffle(arr){
    let i=0;
    while (i<arr.length){
        let rand = Math.floor(Math.random()*(arr.length-1))
        let temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
        i++;
    }
    return arr;
}

function matchess(arr){
    sirala(arr);
    let matchs = [];
    for (let i=0;i<arr.length-1;i++){
        for (let k=i+1;k<arr.length;k++){
            let array = [dizi[i],dizi[k]];
            matchs.push(array);
        }
    }
    return matchs;
}





// eşleşmeleri ekrana bastırmak ve her maçı kazananları belirlemek.
let start = document.querySelector('.start');
start.addEventListener('click',function(){
    if (dizi.length<4){
        alert('en az 4 oyuncu turnuvaya katılmak zorunda.');
        return;
    }
    else{
        //disabled the adding player button.
        
        document.querySelector('#ekle').disabled = true;
        document.querySelector('#ekle').cursor = 'no-drop';
        
        let matching = matchess(dizi);
        let competition = shuffle(matching);
        for (let i of competition){

            
            let main = document.createElement('div');

            main.classList.add('players')

            let first = document.createElement('div');

            first.classList.add('first');

            let second = document.createElement('div');

            second.classList.add('second');

            let content1 = document.createTextNode(i[0].name);
            let content2 = document.createTextNode(i[1].name);

            let input = document.createElement('input');
            input.classList.add('whowins');
            input.setAttribute('placeholder','who wins');

            let btns = document.createElement('input');
            btns.classList.add('onaylama');
            btns.setAttribute('type','submit');
            btns.setAttribute('value','Uygula');
            
            

            first.appendChild(content1);
            second.appendChild(content2);

            main.appendChild(first);
            main.appendChild(second);
            main.appendChild(input);
            main.appendChild(btns);
            
            document.querySelector('.competitions').appendChild(main);

        }
        start.disabled = true;
        start.style.cursor = "no-drop";

        

        let buttons = document.querySelectorAll('.onaylama');
        let inputs = document.querySelectorAll('.whowins');

        // first and second players to check the input validation.
        let first_players = document.querySelectorAll('.first');
        let second_players = document.querySelectorAll('.second')


        //kazanan oyunculara ren atama,butonları düzenleme ve puan durumunu güncellemek.
        for (let i=0;i<buttons.length;i++){
            buttons[i].addEventListener('click',function(){
            let val = inputs[i].value;


            if ( val==first_players[i].innerHTML){
                first_players[i].style.backgroundColor = "green";
                second_players[i].style.backgroundColor = "red";
                buttons[i].disabled = true;
                buttons[i].style.cursor = "no-drop";

                for (i of dizi){
                    if (i.name == val){
                        i.puan+=1;
                    }
                }

            }
            else if ( val==second_players[i].innerHTML  ){
                second_players[i].style.backgroundColor = "green";
                first_players[i].style.backgroundColor = "red";
                buttons[i].disabled = true;
                buttons[i].style.cursor = "no-drop";

                for (i of dizi){
                    if (i.name == val){
                        i.puan+=1;
                    }
                }

            }
            else{
                alert('böyle bir oyuncu adı yok.');
                
            }

            })
        }
        // Tüm maçlar sonucunda oyuncuların önce puanlarına göre, daha sonra da elo'larına göre bir sıralamasının yapılması...
        let ranking_button = document.createElement('input');
        ranking_button.classList.add('rank');
        ranking_button.setAttribute('type','submit');
        ranking_button.setAttribute('value','Sort');
        document.querySelector('.competitions').appendChild(ranking_button);

        let sorting = document.querySelector('.rank');

        sorting.addEventListener('click',function(){
            let buttons = document.querySelectorAll('.onaylama');

            let check = true;

            for (i of buttons){
                if (i.disabled==false){
                    check = false;
                    break;
                }
            }
            if (check){
                // oyuncuları sırala fonksiyonunun gereksinimlerine göre sıralayıp ekrana basma.
                let sorting_div = document.querySelector('.sorting');
                let sorting_table = document.createElement('table');
                let sorting_table_row = document.createElement('tr');

                sorting_div.style.backgroundColor = 'rgb(234, 238, 199)';
                //adding some headers manually (queue,name,point)
                let sorting_table_head_queue = document.createElement('th');
                sorting_table_head_queue.innerHTML = 'Sıra no';
                sorting_table_row.appendChild(sorting_table_head_queue);

                let sorting_table_head_name = document.createElement('th');
                sorting_table_head_name.innerHTML = 'İsim';
                sorting_table_row.appendChild(sorting_table_head_name);

                let sorting_table_head_point = document.createElement('th');
                sorting_table_head_point.innerHTML = 'Puan';
                sorting_table_row.appendChild(sorting_table_head_point);

                sorting_table.appendChild(sorting_table_row)

                //Sıralı haldeki oyuncu dizisi
                let arr = sirala(dizi);
                for (let tr_index=0;tr_index<arr.length;tr_index++){
                    let tr = document.createElement('tr');

                    let td_queue = document.createElement('td');
                    let td_name = document.createElement('td');
                    let td_point = document.createElement('td');

                    td_queue.innerHTML = tr_index+1;
                    td_name.innerHTML = arr[tr_index].name;
                    td_point.innerHTML = arr[tr_index].puan;
                    tr.appendChild(td_queue);
                    tr.appendChild(td_name);
                    tr.appendChild(td_point);

                    sorting_table.appendChild(tr)
                }
                sorting_div.appendChild(sorting_table)

                sorting.style.display = 'none';
            }
        })
    }


})