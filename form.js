$("#secondPart").hide()

$("#employeeDataSubmitBtn").click(() => {
    let name = $("#name").val()
    let company = $("#company").val()
    let salary = $("#salary").val()
    let position = $("#position").val()
    let logo = $("#logo").val()  //we are taking given inputs by .val()

    if (name == "" || company == "" || salary == "") alert("Please fill first 3 fields.!")
    else {
        var newEmployee = {
            Name: name,
            Company: company,
            Salary: salary,
            Designation: position,
            CompanyLogo: logo
        }
        updateData(newEmployee)  //without this you cannot add new employees.
        console.log(newEmployee)
        $("#name").val("")  //we are setting input value as empty by .val("") -given dbl semicolans inside it.
        $("#company").val("")
        $("#salary").val("")
        $("#position").val("")
        $("#logo").val("")
    }
})

getData = () => {
    let data = localStorage.getItem('employees') || "Add Something.!.Empty here."
    let parseData = JSON.parse(data)
    return parseData
}
setData = (s) => {
    let str = JSON.stringify(s)
    localStorage.setItem("employees", str)
}
updateData = (u) => {
    let data = getData()
    data.arr.push(u)
    setData(data)
    console.log(data)
}
if (localStorage.employees != undefined) console.log("The item is already existed..!")
else {
    const obj = {    //do this initialisation after writing set function,
        arr: [          //else it's shows setData is not-defined.
            {
                Name: "madhu",
                Company: "google",
                Salary: "40000",
                Designation: "developer",
                CompanyLogo: "./source/logo_google.jpg"
            },
            {
                Name: "harika",
                Company: "google",
                Salary: "25000",
                Designation: "receptionist",
                CompanyLogo: "./source/logo_google.jpg"
            },
            {
                Name: "ravi",
                Company: "masai",
                Salary: "50000",
                Designation: "mentor",
                CompanyLogo: "./source/logo_masai.png"
            },
            {
                Name: "sandya",
                Company: "masai",
                Salary: "50000",
                Designation: "manager",
                CompanyLogo: "./source/logo_masai.png"
            },
            {
                Name: "ramesh",
                Company: "google",
                Salary: "80000",
                Designation: "programmer",
                CompanyLogo: "./source/logo_google.jpg"
            },
            {
                Name: "venkat",
                Company: "masai",
                Salary: "60000",
                Designation: "mentor",
                CompanyLogo: "./source/logo_masai.png"
            },
            {
                Name: "prakash",
                Company: "google",
                Salary: "90000",
                Designation: "adminstration",
                CompanyLogo: "./source/logo_google.jpg"
            },
            {
                Name: "prateek",
                Company: "masai",
                Salary: "200000",
                Designation: "CEO",
                CompanyLogo: "./source/logo_masai.png"
            },
        ]             
    }
    setData(obj)
    console.log("New item initialised in localstorage.!")
}

removeEmployee = (delName) => {
    console.log("removeEmployee function invoked.!")
    let data = getData()
    let a = data.arr
    console.log(data.arr.length)
    let outArr = []
    flag = 0
    for (i = 0; i < a.length; i++) {
        if (a[i].Name == delName) {
            flag = 1
        }
        else {
            outArr.push(a[i])
        }
    }
    if (flag == 1) {
        console.log(delName, " and i am removing this one.")
        let obj = {
            arr: outArr
        }
        setData(obj)  //dont uncomment it until ur clear with outArr output
        console.log(outArr)
        dataToCards(outArr)
    }
    else {
        console.log("check this remove function.!")
    }
}

var n = 1 //this is for playing with show and hide options
$("#showAllEmployeesBtn").click(() => {
    n++
    if (n % 2 == 0) {
        $("#employeeDetailEnterDiv").hide()
        $("#secondPart").show()
    }
    else {
        $("#employeeDetailEnterDiv").show()
        $("#secondPart").hide()
    }
    let data = getData()
    console.log(data.arr.length + " this is employees count")
    dataToCards(data.arr)

    companiesList(data.arr)

    let perPageVal = 5
    let noOfButtons = Math.ceil(data.arr.length / perPageVal)
    console.log("no of buttons are " + noOfButtons)
    $("#buttonsDiv").html("")
    for (b = 1; b <= noOfButtons; b++) {
        let btn = `<button class="pageBtn m-2" onclick="showBtnNo(${b})">${b}</button>`
        $("#buttonsDiv").append(btn)
    }
    // $(".pageBtn").on("click", function () {     //to change button color after click but it's not
    //     $(this).css("background-color", "lime");   //reseting if i press another button that and 
    // })                                             //both getting color
})

function showBtnNo(n) {
    let data = getData()
    let perPageVal = 5
    console.log(n + " btn pressed")
    var arr = []
    let start = (n - 1) * perPageVal
    let end
    if ((start + perPageVal) >= data.arr.length) end = data.arr.length
    else end = start + perPageVal
    for (k = start; k < end; k++) { //u can use slice() also.
        arr.push(data.arr[k])       //let arr= data.arr.slice(start, end)
    }
    dataToCards(arr)
}

function dataToCards(array) {
    $("#cardsDiv").html("")
    array.forEach(eachObj => {
        let card = `<div class="card p-1 border border-warning m-2" style="width: 14rem;">
                        <img src="${eachObj.CompanyLogo}" height="100px" class="card-img-top"">
                        <div class="card-body">
                            <h5 class="card-title">${eachObj.Name}</h5>
                            <h6 class="card-subtitle mb-2 text-secondary">${eachObj.Designation}</h6>
                            <p class="card-text">Company : ${eachObj.Company}</p>
                            <p class="card-text">Salary :${eachObj.Salary}</p>
                            <button class="text-danger" onclick= removeEmployee("${eachObj.Name}")>Remove</button>
                        </div>
                    </div>`
        $("#cardsDiv").append(card)
    })
}

function companiesList(array) {
    let companies = []
    $("#companySelect").html("")
    array.forEach(obj => {
        companies.push(obj.Company)
    })
    let diffCompanies = rmDuplicates(companies)
    console.log(companies, diffCompanies)
    diffCompanies.forEach(each => {
        $("#companySelect").append(`<option value="${each}">${each}</option>`)
    })
}
rmDuplicates = (arr) => {
    arr = arr.sort()
    let stack = [arr[0]]
    for (i = 1; i < arr.length; i++) {
        if (arr[i] != arr[i - 1]) stack.push(arr[i])
    }
    console.log("diff companies ", stack)
    return stack
}

$("#companySelect").change(() => {
    let selectedCompany = $("#companySelect").val()
    console.log(selectedCompany)
    let data = getData()
    function selectedCompanyEmployeeSOnly(obj) {
        console.log(obj)
        return obj.Company == selectedCompany
    }
    var selectedCompanyEmployeeArr = data.arr.filter(selectedCompanyEmployeeSOnly)
    console.log(selectedCompanyEmployeeArr, "selectedCompanyEmployeeArr is")
    dataToCards(selectedCompanyEmployeeArr)
})

$("#sortSelect").change(() => {
    var sortType = $("#sortSelect").val()
    console.log(sortType, " is sort type")
    let data = getData()
    if (sortType == "increasing") {
        let ascendingArr = data.arr.sort((a, b) => {
            if (Number(a.Salary) < Number(b.Salary))
                return -1;
            if (Number(a.Salary) > Number(b.Salary))
                return 1;
            // return 0;
        })
        console.log(ascendingArr, sortType)
        dataToCards(ascendingArr)

    }
    else {
        let descendingArr = data.arr.sort((a, b) => {
            if (Number(a.Salary) > Number(b.Salary))
                return -1;
            if (Number(a.Salary) < Number(b.Salary))
                return 1;
            // return 0;
        })
        console.log(descendingArr, sortType)
        dataToCards(descendingArr)
    }
})