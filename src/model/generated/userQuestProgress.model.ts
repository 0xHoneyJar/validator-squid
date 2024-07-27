import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Quest} from "./quest.model"
import {StepProgress} from "./stepProgress.model"

@Entity_()
export class UserQuestProgress {
    constructor(props?: Partial<UserQuestProgress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    address!: string

    @Index_()
    @ManyToOne_(() => Quest, {nullable: true})
    quest!: Quest

    @IntColumn_({nullable: false})
    currentStep!: number

    @BooleanColumn_({nullable: false})
    completed!: boolean

    @OneToMany_(() => StepProgress, e => e.userQuestProgress)
    stepProgresses!: StepProgress[]
}
