import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {User} from "./user.model"
import {Quest} from "./quest.model"
import {UserStepProgress} from "./userStepProgress.model"

@Entity_()
export class UserQuestProgress {
    constructor(props?: Partial<UserQuestProgress>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => Quest, {nullable: true})
    quest!: Quest

    @IntColumn_({nullable: false})
    currentStep!: number

    @BooleanColumn_({nullable: false})
    completed!: boolean

    @OneToMany_(() => UserStepProgress, e => e.userQuestProgress)
    stepProgresses!: UserStepProgress[]
}
