import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, StringColumn as StringColumn_, BooleanColumn as BooleanColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Vault} from "./vault.model"

@Entity_()
export class Incentive {
    constructor(props?: Partial<Incentive>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Vault, {nullable: true})
    vault!: Vault

    @Index_()
    @StringColumn_({nullable: false})
    token!: string

    @BooleanColumn_({nullable: false})
    active!: boolean

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @BigIntColumn_({nullable: false})
    incentiveRate!: bigint

    @BigIntColumn_({nullable: false})
    addedAt!: bigint

    @BigIntColumn_({nullable: true})
    removedAt!: bigint | undefined | null
}
