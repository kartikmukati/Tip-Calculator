const getValues = () => {
    var billAmount = document.getElementById('bill-amount').value
    billAmount = billAmount.replace(/\s+/g, '')
    var tipPercent = parseInt(document.getElementById('tip').value)
    var people = parseInt(document.getElementById('people').value)
    return { billAmount: billAmount, tipPercent: tipPercent, people: people }
}

const onInputChange = () => 
{
    var {billAmount, tipPercent, people} = getValues()
    
    change(billAmount, tipPercent, people)
}

const tipCalculate = (event) => 
{
    
    var {billAmount, tipPercent, people} = getValues()

    if (isNaN(billAmount) || billAmount.length <= 0) 
        alert('Enter a valid amount');

    else if(billAmount > 0)
    {
        var id;
        try 
        {
            id = event.id    
        } 
        catch (error) 
        {
            console.log('Can not read property of id undefined');
        }
        var tipPercent;
        if(id === 'btn-plus-tip') 
        {
            document.getElementById('tip').value = tipPercent + 1;
            tipPercent = parseInt(document.getElementById('tip').value);
            if (tipPercent > 0) 
                document.getElementById('btn-minus-tip').disabled = false;
        } 
        else if(id == 'btn-minus-tip') 
        {
            document.getElementById('tip').value = tipPercent - 1;
            tipPercent = parseInt(document.getElementById('tip').value);
            if (tipPercent <= 0) 
                document.getElementById('btn-minus-tip').disabled = true;
        }
        change(billAmount, tipPercent, people) ;
    }
}

const peopleCalculate = (event) => 
{
    var {billAmount, tipPercent, people} = getValues();

    if (isNaN(billAmount) || billAmount.length <= 0 ) 
        alert('Enter a valid amount');

    else if(billAmount > 0)
    {
        var id;
        try 
        {
            id = event.id;
        } 
        catch (error) 
        {
            console.log('Can not read property of id undefined');
        }
        if(id == 'btn-plus-people') 
        {
            document.getElementById('people').value = people + 1;
            people = parseInt(document.getElementById('people').value);
            if (people > 0) 
                document.getElementById('btn-minus-people').disabled = false;
        }
        else if(id == 'btn-minus-people') 
        {
            document.getElementById('people').value = people - 1;
            people = parseInt(document.getElementById('people').value);
            if (people <= 0) 
                document.getElementById('btn-minus-people').disabled = true;
        }
        change(billAmount, tipPercent, people)
    }
}
const change = (billAmount, tipPercent, people) => {

    if (tipPercent > 0 && people > 0) 
        document.getElementById('tip-per-person').innerHTML = '$' + ((billAmount * (tipPercent / 100)) / people).toFixed(2);
    else if (tipPercent == 0)
        document.getElementById('tip-per-person').innerHTML = '$' + 0;
    if (people > 0)
        document.getElementById('amount-per-person').innerHTML = '$' + ((billAmount  / people )).toFixed(2);
    else if (people == 0)
        document.getElementById('amount-per-person').innerHTML = '$' + 0;
}
