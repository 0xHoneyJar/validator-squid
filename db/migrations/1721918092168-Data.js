module.exports = class Data1721918092168 {
    name = 'Data1721918092168'

    async up(db) {
        await db.query(`CREATE TABLE "quest_step" ("id" character varying NOT NULL, "step_number" integer NOT NULL, "type" text NOT NULL, "address" text NOT NULL, "token_id" numeric, "event_name" text NOT NULL, "filter_criteria" jsonb, "required_amount" integer NOT NULL, "quest_id" character varying, CONSTRAINT "PK_2701eac9024314902255b9efaf7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9dc3e0b37118e6c7035a54d9d9" ON "quest_step" ("quest_id") `)
        await db.query(`CREATE TABLE "quest" ("id" character varying NOT NULL, "name" text NOT NULL, "chain" text NOT NULL, "start_time" integer, "end_time" integer, "total_participants" integer NOT NULL, "total_completions" integer NOT NULL, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "step_progress" ("id" character varying NOT NULL, "step_number" integer NOT NULL, "progress_amount" integer NOT NULL, "user_quest_progress_id" character varying, CONSTRAINT "PK_4a0d11758626d75e36814ab7459" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_e63392ab41383a0cdcf2bde6db" ON "step_progress" ("user_quest_progress_id") `)
        await db.query(`CREATE TABLE "user_quest_progress" ("id" character varying NOT NULL, "current_step" integer NOT NULL, "completed" boolean NOT NULL, "user_id" character varying, "quest_id" character varying, CONSTRAINT "PK_201dda0520db698521cb9cbfda6" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d22efcc0f7c2808f935ef9f711" ON "user_quest_progress" ("user_id") `)
        await db.query(`CREATE INDEX "IDX_7420506ba802bf996bde06b5c5" ON "user_quest_progress" ("quest_id") `)
        await db.query(`ALTER TABLE "quest_step" ADD CONSTRAINT "FK_9dc3e0b37118e6c7035a54d9d90" FOREIGN KEY ("quest_id") REFERENCES "quest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "step_progress" ADD CONSTRAINT "FK_e63392ab41383a0cdcf2bde6db5" FOREIGN KEY ("user_quest_progress_id") REFERENCES "user_quest_progress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_d22efcc0f7c2808f935ef9f711f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_7420506ba802bf996bde06b5c5c" FOREIGN KEY ("quest_id") REFERENCES "quest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "quest_step"`)
        await db.query(`DROP INDEX "public"."IDX_9dc3e0b37118e6c7035a54d9d9"`)
        await db.query(`DROP TABLE "quest"`)
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "step_progress"`)
        await db.query(`DROP INDEX "public"."IDX_e63392ab41383a0cdcf2bde6db"`)
        await db.query(`DROP TABLE "user_quest_progress"`)
        await db.query(`DROP INDEX "public"."IDX_d22efcc0f7c2808f935ef9f711"`)
        await db.query(`DROP INDEX "public"."IDX_7420506ba802bf996bde06b5c5"`)
        await db.query(`ALTER TABLE "quest_step" DROP CONSTRAINT "FK_9dc3e0b37118e6c7035a54d9d90"`)
        await db.query(`ALTER TABLE "step_progress" DROP CONSTRAINT "FK_e63392ab41383a0cdcf2bde6db5"`)
        await db.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_d22efcc0f7c2808f935ef9f711f"`)
        await db.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_7420506ba802bf996bde06b5c5c"`)
    }
}
