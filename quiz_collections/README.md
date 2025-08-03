## Quiz Collections

Get the latest quiz collections to populate your quizlet database with.
The latest main collection is [v0.1.0](https://github.com/BlueHouseProducts/quizly-mygcse/blob/main/quiz_collections/v0.1.0_data.json)

See how to setup/update your project at [https://github.com/BlueHouseProducts/quizly-mygcse/](https://github.com/BlueHouseProducts/quizly-mygcse/)

## Download using Powershell:
```ps
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/BlueHouseProducts/quizly-mygcse/refs/heads/main/quiz_collections/v0.1.0_data.json" -OutFile "data.json"
```
Then run `npm run push:quizes {your_database_id} data.json`
