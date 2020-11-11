//Function to return input values
const getValues = () => {
    var status = true;
    var isException = false;
    try
    {
        var billAmount = document.getElementById('bill-amount').value
        var tipPercent = document.getElementById('tip').value
        var people = document.getElementById('people').value
    }
    catch(error)
    {
        isException = true;
    }
    billAmount = billAmount.replace(/\s+/g, '');
    var parsedBillAmount = parseFloat(billAmount)
    if(isNaN(billAmount) || billAmount.length <= 0 || parsedBillAmount < 0 || isNaN(tipPercent) || isNaN(people))
        status = false
    else
    {
        var parsedTipPercent = parseFloat(tipPercent)
        var parsedPeople = parseInt(people)
    }
    return { billAmount: parsedBillAmount, tipPercent: parsedTipPercent, people: parsedPeople, status: status, isException: isException }
}
//Responsible for handling changes in input field
const onInputChange = () => 
{
    var {billAmount, tipPercent, people, status, isException} = getValues()
    
    if(status == true && isException == false) 
        change(billAmount, tipPercent, people);
    else if(isException == true)
        alert('Something went wrong');
    else if(status == false)
        alert('Please enter valid number');
}
//Below function will return type of operation perfomed
const getOperation = (event) => {
    var id;
    try 
    {
        id = event.id    
    } 
    catch (error) 
    {
        console.log('Can not read property of id undefined');
    }
    return id;
}
//Function to add and subtract the Tip percent, 
const tipCalculate = (event) => 
{
    var {billAmount, tipPercent, people, status, isException} = getValues()

    if (status == true)
    {
        var id = getOperation(event);

        var tipPercent;
        //If user press '-' button for tip percent
        if(id === 'btn-plus-tip' && people >= 0) 
        {
            document.getElementById('tip').value = tipPercent + 1;
            tipPercent = parseInt(document.getElementById('tip').value);
        } 
        //If user press '+' button for tip percent
        else if(id == 'btn-minus-tip' && people >= 0) 
        {
            document.getElementById('tip').value = tipPercent - 1;
            tipPercent = parseInt(document.getElementById('tip').value);                
        }
        change(billAmount, tipPercent, people) ;
    }
    //If any negative or string containing values passed
    else if (status == false && isException != true)
        alert('Please enter valid number');
    //For handling any exception
    else if(isException == true)
        alert('Something went wrong');

}
//Function to add and subtract the Number of People
const peopleCalculate = (event) => 
{
    var {billAmount, tipPercent, people, status, isException} = getValues();

    if (status == true)
    {
        var id = getOperation(event);
        console.log(id)

        if(id == 'btn-plus-people' && tipPercent >= 0) 
        {
            document.getElementById('people').value = people + 1;
            people = parseInt(document.getElementById('people').value);
        }
        else if(id == 'btn-minus-people' && tipPercent >= 0) 
        {
            document.getElementById('people').value = people - 1;
            people = parseInt(document.getElementById('people').value);
            
        }
        //Calling of below function to calculate the Tip per person and Total per person
        change(billAmount, tipPercent, people)
    }
    else if (status == false && isException != true)
        alert('Please enter valid number');
    else if (isException == true)
        alert('Something went wrong');
}
//Below function is responsible for calculating Tip per person,
// Total per person and also responsible for displaying it.
const change = (billAmount, tipPercent, people) => {

    if (tipPercent > 0 && people > 0) 
    {
        document.getElementById('btn-minus-tip').disabled = false;
    }
    else if (tipPercent == 0)
    {
        document.getElementById('tip-per-person').innerHTML = '$' + 0.00;
        document.getElementById('btn-minus-tip').disabled = true;
    }
    else if (tipPercent < 0)
    {
        alert('Enter a valid Tip Percent')
        document.getElementById('btn-minus-tip').disabled = true;
    }
    if (people > 0)
    {
        document.getElementById('amount-per-person').innerHTML = '$' + ((billAmount  / people )).toFixed(2);
        document.getElementById('btn-minus-people').disabled = false;
    }
    else if (people == 0)
    {
        document.getElementById('amount-per-person').innerHTML = '$' + 0.00;
        document.getElementById('tip-per-person').innerHTML = '$' + 0.00;
        document.getElementById('btn-minus-people').disabled = true;
    }
    else if (people < 0)
    {
        alert('Enter a valid number of People')
        document.getElementById('btn-minus-people').disabled = true;
    }
    if (tipPercent > 0 && people > 0) 
        document.getElementById('tip-per-person').innerHTML = '$' + ((billAmount * (tipPercent / 100)) / people).toFixed(2);
}
