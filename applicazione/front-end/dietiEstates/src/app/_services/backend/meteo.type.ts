export interface ApiResponse {
    daily: {
      time: number; // Timestamp di inizio
      timeEnd: number; // Timestamp di fine
      interval: number; // Intervallo in secondi
      variables: {
        valuesArray: number[]; // Array dei valori per ogni variabile
      }[];
    };
    utcOffsetSeconds: number; // Offset UTC in secondi
  };


  export interface WeatherData  {
    daily: {
      time: Date[]; // Array di date calcolate dai timestamp
      weatherCode: number[]; // Codici meteo giornalieri
      temperature2mMax: number[]; // Temperature massime
      temperature2mMin: number[]; // Temperature minime
      precipitationSum: number[]; // Precipitazioni totali
      rainSum: number[]; // Pioggia totale
      showersSum: number[]; // Temporali totali
      snowfallSum: number[]; // Neve totale
      precipitationProbabilityMax: number[]; // Probabilità massima di precipitazione
    };
  };