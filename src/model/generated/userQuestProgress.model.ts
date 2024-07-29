import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Quest} from "./quest.model"
import {StepProgress} from "./stepProgress.model"

@Index_(["id", "address"], {unique: false})
@Index_(["id", "completed"], {unique: false})
@Entity_()
export class UserQuestProgress {
    constructor(props?: Partial<UserQuestProgress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    address!: string

    @Index_()
    @ManyToOne_(() => Quest, {nullable: true})
    quest!: Quest

    @IntColumn_({nullable: false})
    currentStep!: number

    @Index_()
    @BooleanColumn_({nullable: false})
    completed!: boolean

    @OneToMany_(() => StepProgress, e => e.userQuestProgress)
    stepProgresses!: StepProgress[]
}
