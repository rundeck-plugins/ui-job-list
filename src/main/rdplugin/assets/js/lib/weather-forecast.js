var WeatherForecast = window.WeatherForecast || {
    calcTrends: function (executions) {
        var trendarr = [];
        var statusmap = {
            succeeded: -1,
            succeed: -1,
            failed: 1,
            fail: 1,
            'failed-with-retry': 1,
            aborted: 1,
            other: 0,
            timedout: 1
        };
        for (var x = 0; x < executions.length && x < 5; x++) {
            trendarr.push(statusmap[executions[x].status()] || 0);
        }
        return trendarr;
    },
    calcWeather: function (trendarr) {
        var weather = 0;
        var weathercount = 0;
        for (var x = trendarr.length - 1; x >= 0; x--) {
            weather += (trendarr[x] * (trendarr.length - x));
            if(trendarr[x]!=0) {
                weathercount += (trendarr.length - x);
            }
        }
        return {
            weather: weather,
            weathercount: weathercount
        }
    },
    forecastValues: [
        "sunny",
        "partial",
        "cloudy",
        "cloudy",
        "stormy",
        "stormy"
    ],
    calcForecast: function (w, max) {
        var min = -1 * max;
        var ratio = (w + max) / (max - min);
        return Math.floor(ratio * (WeatherForecast.forecastValues.length - 1));
    },
    forecast: function (index) {
        return WeatherForecast.forecastValues[index];
    },
    forecastCss: {
        "sunny": "text-success",
        "partial": "text-muted",
        "cloudy": "text-warning",
        "stormy": "text-danger"
    },
    forecastGlyphicon: {
        "sunny": "glyphicon-thumbs-up",
        "partial": "glyphicon-cloud",
        "cloudy": "glyphicon-thumbs-down",
        "stormy": "glyphicon-fire"
    },
    forecastText: {
        "": "No executions",
        "sunny": "Mostly successful executions",
        "partial": "Some Failed executions",
        "cloudy": "Many failed executions",
        "stormy": "Mostly failed executions"
    }
};