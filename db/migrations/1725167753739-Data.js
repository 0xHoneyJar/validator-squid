module.exports = class Data1725167753739 {
    name = 'Data1725167753739'

    async up(db) {
        await db.query(`CREATE TABLE "incentive" ("id" character varying NOT NULL, "token" text NOT NULL, "active" boolean NOT NULL, "amount" numeric NOT NULL, "incentive_rate" numeric NOT NULL, "added_at" numeric NOT NULL, "removed_at" numeric, "vault_id" character varying, CONSTRAINT "PK_fc2c4e32d8711392ddf918b9f6c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d0684355463e304b4a67648c51" ON "incentive" ("vault_id") `)
        await db.query(`CREATE INDEX "IDX_92fd60de9b49e854d0810fd6f1" ON "incentive" ("token") `)
        await db.query(`CREATE TABLE "vault" ("id" character varying NOT NULL, "address" text NOT NULL, "staking_token" text NOT NULL, "created_at" numeric NOT NULL, CONSTRAINT "PK_dd0898234c77f9d97585171ac59" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_35a94164f935280cf7fe9b1347" ON "vault" ("address") `)
        await db.query(`CREATE INDEX "IDX_a270f9ea4610a4a62c0fc9fd17" ON "vault" ("staking_token") `)
        await db.query(`ALTER TABLE "incentive" ADD CONSTRAINT "FK_d0684355463e304b4a67648c51b" FOREIGN KEY ("vault_id") REFERENCES "vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "incentive"`)
        await db.query(`DROP INDEX "public"."IDX_d0684355463e304b4a67648c51"`)
        await db.query(`DROP INDEX "public"."IDX_92fd60de9b49e854d0810fd6f1"`)
        await db.query(`DROP TABLE "vault"`)
        await db.query(`DROP INDEX "public"."IDX_35a94164f935280cf7fe9b1347"`)
        await db.query(`DROP INDEX "public"."IDX_a270f9ea4610a4a62c0fc9fd17"`)
        await db.query(`ALTER TABLE "incentive" DROP CONSTRAINT "FK_d0684355463e304b4a67648c51b"`)
    }
}
