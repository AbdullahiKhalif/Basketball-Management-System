
$("#playerContractStatReport").on("submit", function(event) {
    $("#playerContractStatReportTable thead").html("");
    $("#playerContractStatReportTable tbody").html("");
    event.preventDefault();
     var SendingData = {
        "action": "getPlayerContractStatement",
     };

     $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/reports.php",
        data: SendingData,
        
        success: (data) =>{
            var status = data.status;
            var response = data.data;
            var tr = '';
            var th = '';

            if(status){
                 response.forEach(item => {
                    th = "<tr>";
                    for(let i in item){
                        th += `<th>${i}</th>`;
                    }
                    th += "</tr>";

                    tr += "<tr>";
                    for(let i in item){
                        if (i == "image") {
                            tr += `<td> <img src="../uploads/players/${item[i]}" style="width:40px;height:40px;border:1px solid #f44547; border-radius:50%; object-fit:cover;"></td>`;
                          } else {
                            tr += `<td>${item[i]}</td>`;
                          }
                    }
                   

                    tr += "</tr>";
                 })
                 $("#playerContractStatReportTable thead").append(th);
                 $("#playerContractStatReportTable tbody").append(tr);
            }
        }
     })
})


$("#printStatement").on("click",function(){
    printStatement();
})
$("#exportStatement").on("click",function(event){
    var file = new Blob([$("#printArea").html()], {type: "application/vnd.ms-excel"});
    var url = URL.createObjectURL(file);
    var a = $("<a />", {
        href: url,
        download: "Print Statement.xls"
    }).appendTo("body").get(0).click();
    event.preventDefault();
});
function printStatement(){
    let printArea = document.querySelector("#printArea");

    var newWindow = window.open("");
    newWindow.document.write(`<html><head><title>Print Statement</title>`);
    newWindow.document.write(`<style media="print">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    body{
        font-family: 'Poppins', sans-serif;
    }
    table{
        width: 100%;
    
    }
    th{
        background-color: #04AA6D !important;
        color: #ffffff !important;
        font-size: 20px !important;
        font-weight: bold !important;
    }
    th , td{
        padding: 15px !important;
        text-align: left !important;
        border-bottom: 1px solid #ddd !important;
    }
    </style>`)
    newWindow.document.write(`</head><body>`)
    newWindow.document.write(printArea.innerHTML);
    newWindow.document.write(`</body></html>`);
    newWindow.print();
   newWindow.close();
   
}