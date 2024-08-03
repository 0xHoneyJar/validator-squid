import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"
import {UserQuestProgress} from "./userQuestProgress.model"

@Entity_()
export class StepProgress {
    constructor(props?: Partial<StepProgress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => UserQuestProgress, {nullable: true})
    userQuestProgress!: UserQuestProgress

    @IntColumn_({nullable: false})
    stepNumber!: number

    @BigIntColumn_({nullable: false})
    progressAmount!: bigint

    @Index_()
    @BooleanColumn_({nullable: false})
    completed!: boolean
}
