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

        {!! Form::open(array('url' => 'foo/bar')) !!}
           {{ Form::label('aptName', 'Naam') }}
            {{ Form::text('aptName') }}

            {{ Form::label('aptDate', 'Datum') }}
            {{ Form::date('aptDate') }}

            <div class="from">
                {{ Form::label('aptFrom', 'Van') }}
                {{ Form::time('aptFrom') }}
            </div>

            <div class="till">
                {{ Form::label('aptTill', 'Tot') }}
                {{ Form::time('aptTill') }}
            </div>

            {{ Form::submit('Toevoegen', ['class' => 'button button-primary']) }}
        {!! Form::close() !!}

        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</body>

<!-- Compressed JavaScript -->
<script src="{{ mix('js/app.js') }}"></script>
</html>