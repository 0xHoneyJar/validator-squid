import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
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

    @IntColumn_({nullable: false})
    progressAmount!: number
}
