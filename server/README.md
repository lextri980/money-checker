# Fupartment Store

## Description
This is a website about department store.

## Migration
**1. Generate migration**
```bash
npm run migration:generate -- ./src/databases/migrations/[db_name]
```
**2. Run migration**
```bash
npm run migration:run
```
**3. Revert migration**
```bash
npm run migration:revert
```

## Running the app 
**1. Install package**
```bash
npm install
```
**2. Run migration**
```bash
npm run migration:run
```
**3. Start application**
```bash
npm run start:watch
```
**4. Open swagger**
```bash
npm run start
```
Then, access this [url](http://localhost:5000/api-docs).

## Technologies
- Framework: `NestJS`
- Database: `MySQL`