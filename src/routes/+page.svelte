<script>
    import Nav  from "../components/nav.svelte";
    import "../app.css";
    console.log('Hello world')
</script>
<svelte:head>
    <title>Svelte index</title>
</svelte:head>
<Nav />
<div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">Expense Tracking App</h1>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="/app" class="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Get started</a>
    </div>
  </div>
