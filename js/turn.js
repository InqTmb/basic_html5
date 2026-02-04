class GameProcess {
	constructor() {
		this.CurrentTurnNumber = 0;
        this.CurrentPhaseNumber = 0;
        this.Turn = []; // массив фаз хода

        this.status = -1;   // -1 - не началась
                            // 0 - Пауза
                            // 1 - игра

	}

    isPaused() {
        if (this.status==0) {
            return true;
        }
        return false;
    }

    isPlay() {
        if (this.status==1) {
            return true;
        }
        return false;
    }

    AddTurnPhase (Phase) {
        this.Turn.push(Phase);
        this.PhaseCount = this.Turn.length;
        this.Turn[this.PhaseCount-1].id = this.PhaseCount-1;
        
    }

    CreateTurnPhase (name) {
        this.AddTurnPhase ( new GamePhase(name) );
    }

    NextTurnPhase(IgnorePause = false) {
        if (this.isPlay() || IgnorePause) {
            this.CurrentPhaseNumber++;
            if (this.CurrentPhaseNumber==this.PhaseCount) {
                this.NextTurn(IgnorePause);
            }
        }

    }

    NextTurn(IgnorePause = false) {
        if (this.isPlay() || IgnorePause) {
            this.CurrentTurnNumber++;
            console.log("Начало хода "+this.CurrentTurnNumber);
            this.CurrentPhaseNumber = 0;
        }
    }

    Start() {
        //начало игры
        this.Play();
    }

    Pause() {
        this.status = 0;
        return false;
    }

    Play() {
        this.status = 1;
        return true;
    }

    TogglePausePlay() {
        if (this.isPaused()) {
            return this.Play();  
        } else {
            return this.Pause();
        }
    }

    ExecutePhase(IgnorePause = false) {
        this.Turn[this.CurrentPhaseNumber].Execute();
        this.NextTurnPhase(IgnorePause);

    }
}

class GamePhase {
    constructor(name) {
        this.name = name;
        this.id = 0;
    }

    Execute() {
        console.log("   "+this.name);
    }

}

class GameTurn {
    constructor() {
    }
    
    AddTurnPhase (Phase) {

    }
}