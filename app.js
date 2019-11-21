
    $.post('https://cracrr.mybluemix.net/time-gerente', {user:'public'}).done(function(response){


      const dataSet = response.data;
      const keys_ = Object.keys(dataSet);
      var data=[];
      var dataChart=[];


      for(var i in keys_){
        var key_ = keys_[i];
        var js =  dataSet[key_];
        var js2;
        var temp_data = [];
        var count_R = 0;
        var count_V = 0;

        js['Nombre'] = key_;

        var keys_2 = Object.keys(js['data']);
        for(var j in keys_2){
          var key_2 = keys_2[j];
          js2 =  js['data'][key_2];

          js2['Nombre'] = key_2;
          js2['id'] = j;
          count_V += js2.VERDE;
          count_R += js2.ROJO;


          temp_data.push(js2);

        }
        //dataChart.push(js['CRA/CRR']);

        js['data'] = temp_data;
        js.ROJO = count_R;
        js.VERDE = count_V;

        data.push(js);

      }

      console.log(data);

      $( "#loader" ).hide();

               //create Tabulator on DOM element with id "example-table"
      var table = new Tabulator("#example-table", {
        //height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:data, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        dataTree:true,
        dataTreeChildField:"data",
        rowClick:function(e, row){ //trigger an alert message when the row is clicked

          if(!(row.getData()["allData"] && true)){
            return;
          }

            var data = row.getData().allData;
           

            if(data.length == 0){
              return;
            }else if(data.length > 1){
              
            }else{
              data=[data];
            }
            var id =row.getData()['id'];

            $(".subTable" + id).toggle();    
        },
        columns:[
          {"title":"Nombre","field":"Nombre"},
          {"title":"Compliance","field":"VERDE",
            formatter:function(cell, formatterParams){
               var value = cell.getValue();
                if(value > 0){
                    return "<span style='color:#37BC9B;field:green' >" + value + "</span>";
                }else{
                    return value;
                }
            }

          },
          {"title":"No Compliance","field":"ROJO",
            formatter:function(cell, formatterParams){
               var value = cell.getValue();
                if(value > 0){
                    return "<span style='color:#DA4453;field:red'>" + value + "</span>";
                }else{
                    return value;
                }
            }
          }
        ],
        rowFormatter: function(row) {
          if(!(row.getData()["allData"] && true)){
            return;
          }

          //create and style holder elements
            var holderEl = document.createElement("div");
            var tableEl = document.createElement("div");

            
            var data = row.getData().allData;
            
            if(data.length == 0){
              return;
            }else if(data.length > 1){
              
            }else{
              data=[data];
            }
            var id =row.getData()['id'];

            $(".subTable" + id).toggle();   
            holderEl.style.boxSizing = "border-box";
            holderEl.style.padding = "10px 10px 10px 10px";
            holderEl.style.borderTop = "1px solid #333";
            holderEl.style.borderBotom = "1px solid #333";
            holderEl.style.background = "#ddd";

            holderEl.setAttribute('class', "subTable" + id + "");


            tableEl.style.border = "1px solid #333";
            tableEl.setAttribute('class', "subTable" + id + "");

            holderEl.appendChild(tableEl);

            row.getElement().appendChild(holderEl);

            var subTable = new Tabulator(tableEl, {
              layout: "fitColumns",
              data: data,
              columns:[
                  {title:"Fecha Inicio",field:"FECHA_INICIO_ETIME"},
                  {title:"Fecha Termino", field:"FECHA_FIN_ETIME"},
                  {title:"Estado" , field:"ESTADO"}
                ]

            })

             $(".subTable" + id).toggle();    
        }
      });


    }); 

