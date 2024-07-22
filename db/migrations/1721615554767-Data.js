module.exports = class Data1721615554767 {
    name = 'Data1721615554767'

    async up(db) {
        await db.query(`ALTER TABLE "quest" DROP COLUMN "completion_status"`)
        await db.query(`ALTER TABLE "quest" ADD "start_time" integer NOT NULL`)
        await db.query(`ALTER TABLE "quest" ADD "end_time" integer NOT NULL`)
        await db.query(`ALTER TABLE "quest" ADD "total_participants" integer NOT NULL`)
        await db.query(`ALTER TABLE "quest" ADD "total_completions" integer NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "quest" ADD "completion_status" integer NOT NULL`)
        await db.query(`ALTER TABLE "quest" DROP COLUMN "start_time"`)
        await db.query(`ALTER TABLE "quest" DROP COLUMN "end_time"`)
        await db.query(`ALTER TABLE "quest" DROP COLUMN "total_participants"`)
        await db.query(`ALTER TABLE "quest" DROP COLUMN "total_completions"`)
    }
}
