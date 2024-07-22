module.exports = class Data1721623362894 {
    name = 'Data1721623362894'

    async up(db) {
        await db.query(`ALTER TABLE "quest" ALTER COLUMN "end_time" DROP NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "quest" ALTER COLUMN "end_time" SET NOT NULL`)
    }
}
