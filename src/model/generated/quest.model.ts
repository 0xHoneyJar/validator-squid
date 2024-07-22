import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, OneToMany as OneToMany_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {QuestStep} from "./questStep.model"

@Entity_()
export class Quest {
    constructor(props?: Partial<Quest>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: false})
    chain!: string

    @OneToMany_(() => QuestStep, e => e.quest)
    steps!: QuestStep[]

    @IntColumn_({nullable: true})
    startTime!: number | undefined | null

    @IntColumn_({nullable: true})
    endTime!: number | undefined | null

    @IntColumn_({nullable: false})
    totalParticipants!: number

    @IntColumn_({nullable: false})
    totalCompletions!: number
}
