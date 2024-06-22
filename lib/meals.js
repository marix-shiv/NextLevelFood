import sql from 'better-sqlite3'

const db = sql('meals.db');

export default async function getMeals(){
    await new Promise(resolve => setTimeout(resolve, 3000));
    // throw new Error('Something went wrong')
    const data = db.prepare('SELECT * FROM meals').all();
    // console.log(data);
    return data
}

export async function getMeal(slug){
    await new Promise(resolve => setTimeout(resolve, 3000));
    const data = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    return data
}