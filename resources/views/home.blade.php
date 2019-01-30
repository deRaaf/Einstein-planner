<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, 
                   initial- scale=1.0, maximum-scale=1.0, 
                   minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" 
          type="text/css" href="{{ mix('css/app.css') }}">
</head>
<body>
    <div id="app">
        <router-view></router-view>
    </div>

    <div class="reveal newItem" id="modalNewItem" data-reveal>
        <h2>Nieuw agenda item</h2>
        <p>Voeg een nieuw item toe</p>

        <form action="">
            <label for="aptName">Naam</label>
            <input type="text" name="aptName" id="aptName">

            <label for="aptDate">Datum</label>
            <input type="date" name="aptDate" id="aptDate">

            <div class="from">
                <label for="aptFrom">Van</label>
                <input type="time" name="aptFrom" id="aptFrom">
            </div>

            <div class="till">
                <label for="aptTill">Tot</label>
                <input type="time" name="aptTill" id="aptTill">
            </div>

            <button class="button button-primary" type="submit">Toevoegen</button>
        </form>

        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</body>

<!-- Compressed JavaScript -->
<script src="{{ mix('js/app.js') }}"></script>
</html>