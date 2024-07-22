import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, JSONColumn as JSONColumn_} from "@subsquid/typeorm-store"
import {Quest} from "./quest.model"

@Entity_()
export class QuestStep {
    constructor(props?: Partial<QuestStep>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Quest, {nullable: true})
    quest!: Quest

    @IntColumn_({nullable: false})
    stepNumber!: number

    @StringColumn_({nullable: false})
    type!: string

    @StringColumn_({nullable: false})
    address!: string

    @BigIntColumn_({nullable: true})
    tokenId!: bigint | undefined | null

    @StringColumn_({nullable: false})
    eventName!: string

    @JSONColumn_({nullable: true})
    filterCriteria!: unknown | undefined | null

    @IntColumn_({nullable: true})
    requiredAmount!: number | undefined | null

    @IntColumn_({nullable: true})
    progressAmount!: number | undefined | null
}
