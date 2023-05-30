<script>
     import Nav  from "../../components/nav.svelte";
     import "../../app.css";
     import spinnerGif from '../../lib/images/_spinner.svg';
     import Loader from '../../components/Loader.svelte';
     export let data;
     let hideForm = false;
     let toggleSpinner = false;
     let isEditing = false;
     let selectedExpense;
     let expenseId;
     console.log(data.expenses);
     let _response;
     //currency format
     let ZARand = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ZAR',
      });
     //expense variables'

     let title;
     let amount;
     //$: totalAmt = data.totExpenses;
    let totalAmt;
     $: totalExpenses = data.expenses.length;

     console.log(title);
     //fetch all expenses
     async function fetchExpenses(){
      toggleSpinner = true;
      const response = await fetch('api/fetch')
      const expenses = await response.json();
      data = expenses;
      toggleSpinner = false;
      updateTotalAmount();
     }

    //add new expense
    async function post() {
      toggleSpinner = true;
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({title: title, amount: amount}),
      headers: {
        'content-type': 'application/json'
      }
      
    });
    toggleSpinner = false;
    hideForm = true;
    fetchExpenses();
    updateTotalAmount();
    hideForm = false;
    // total = await response.json();
  }


  //Update expense
  async function updateExpense(){
      toggleSpinner = true;
      const response = await fetch('/api/update', {
      method: 'PUT',
      body: JSON.stringify({id:expenseId,title:title,amount:amount}),
      headers: {
        'content-type': 'application/json'
      }
    });
    isEditing = false;
    toggleSpinner = false;
    fetchExpenses();
    updateTotalAmount();
  }

     //Delete an expense
     async function deleteExpense(id) {
      toggleSpinner = true;
      console.log(id);
      const response = await fetch('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'content-type': 'application/json'
      }
    });
    toggleSpinner = false;
    fetchExpenses();
    updateTotalAmount();
    //_response = await response.json();
  }

   function updateTotalAmount(){
    let total = 0;
    data.expenses.forEach(element => {
      total+= element.amount;
    });
    // totalAmt = data.expenses.length<=0? 0 :total;
    totalAmt = total;
   }

   function toggleView(){
      hideForm = true;
   }

   function getDate(timeStamp){
    let date = new Date(timeStamp);
    const options = { weekday: "short" };
    let weekDay = new Intl.DateTimeFormat("en-US", options).format(date);
    const options2 = { month: "short" };
    let month = new Intl.DateTimeFormat("en-US", options2).format(date);
    let intDay = date.getDay();
    let day = intDay <10? '0'+intDay : intDay;
    return `${weekDay} ${day}, ${month}, ${date.getFullYear()}`
   }

   function toggleEditing(_title, _amount,_id){
    isEditing  = true;
    selectedExpense = {title:_title,amount:_amount};
    title = selectedExpense.title;
    amount = selectedExpense.amount;
    expenseId = _id;
    console.log(selectedExpense);
   }

</script>
<svelte:head>
    <title>Expenses Tracking App</title>
</svelte:head>
<Nav/>
<div class="app">
<!-- card -->
<div class="credit-card h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform">
            
  
  <div class="w-full px-8 absolute top-8">

      <div class="pt-1">
          <p class="font-normal">
              Total amount
          </p>
          <p class="text-3xl font-bold tracking-more-wider">
              {ZARand.format(totalAmt)}
          </p>
      </div>
      <div class="pt-6 pr-6">
          <div class="flex justify-center">
              
              <div class="">
                  <p class="font-normal">
                      Expenses
                  </p>
                  <p class="font-medium tracking-wider text-sm">
                     {totalExpenses}
                  </p>
              </div>

              
          </div>
      </div>

  </div>
</div>
<!-- end of card -->
<div class="main-div">
<div>

  {#if hideForm || isEditing}
<main>
  {#if toggleSpinner}
  <img class="_spinner h-10 w-10 mt-2"  src="{spinnerGif}" alt="" srcset="">
  
  {/if}
      <p>Title</p>
      <input  bind:value={title}  name="title" type="text" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Title eg: Groceries">
   
      <p>Amount</p>
      
      <input bind:value={amount} name="amount" type="number" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="amount eg: 200 ">
    
    <button on:click={isEditing? updateExpense : post} class="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-orsnge-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gray-500">{isEditing? 'Save': 'Add'}</button>
</main>
{/if}
<!-- circle add button -->
{#if !hideForm && !isEditing}
<div class="flex justify-end mt-3">
  <button on:click={toggleView} class="inline-flex items-center justify-center w-12 h-12 mr-2 text-pink-100 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-orange-500">
<svg enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="none" height="50" width="50"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="9" x2="41" y1="25" y2="25"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="25" x2="25" y1="9" y2="41"/></svg>
    </button>
</div>
{/if}
<!-- end circle add button -->
</div>
<!-- expense container -->

<div class="exp-list" >
  <ul class="decoration-white">
    {#each data.expenses as { title, amount,_id,date }, i}
      <li class="lis-item flex my-3 px-3.5 py-3.5 rounded-2xl justify-between">
        <div class="expense-row"> 
          <p class="decoration-white" contenteditable="true">{title}</p> 
          <!-- <button class="decoration-white" on:click|preventDefault={deleteExpense(_id)}>remove</button> -->
          <button on:click|preventDefault={deleteExpense(_id)} class=" inline-flex items-center justify-center w-4 h-4 mr-2 mt-2 text-pink-100 transition-colors duration-150 bg-gray-500 rounded-full focus:shadow-outline hover:bg-orange-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
           </svg>

            </button>

            <button on:click={toggleEditing(title,amount,_id)} class=" inline-flex items-center justify-center w-4 h-4 mr-2 mt-2 text-pink-100 transition-colors duration-150 bg-gray-500 rounded-full focus:shadow-outline hover:bg-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
           </svg>
            </button>
            <div class="">
              <p class="text-sm font-thin text-gray-900">{getDate(date)}</p>
            </div>
        </div>
         
         <p class="decoration-white font-normal" contenteditable="true">{ZARand.format(amount)}</p>
         
      </li>
    {/each}
  </ul>
</div>
<!-- end of expenses container -->
</div>
</div>
<!-- custom styling -->
<style lang="postcss">
  p{
    color: white;
  }

  button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

.credit-card{
  background: linear-gradient(#ff9d32,#ff491e);
  max-height: 186px;;
}
.pt-1{
  text-align: center;
}
.app{
  border-radius: 0.75rem;
  padding: 0.8rem;
  width: 100%;
  margin: 0 auto;
  background-color: black;
  min-width: 200px
}
ul>li{
  background-color: #29292a;
  align-items: center;
}
.exp-list{
  max-height: 480px;
  overflow-y: scroll;
}
.exp-list::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
._hide{
  display:  none;
}
._spinner{
  margin: 0 auto;
}
.expense-row:hover ._hide { display: inline-flex; }
     
/* Media query for desktop screens */
@media screen and (min-width: 768px) {
      .app{
        width: 400px; /* Specific width for desktop */
        font-size: 18px;
        padding: 0.8rem;
      }
    }

 </style>
