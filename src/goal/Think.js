/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Goal } from './Goal.js';
import { Logger } from '../core/Logger.js';

class Think extends Goal {

	constructor( owner ) {

		super( owner );

		this.evaluators = new Set();

	}

	addEvaluator( evaluator ) {

		this.evaluators.add( evaluator );

		return this;

	}

	removeEvaluator( evaluator ) {

		this.evaluators.delete( evaluator );

		return this;

	}

	arbitrate() {

		let bestDesirabilty = - 1;
		let bestEvaluator = null;

		// try to find the best top-level goal/strategy for the entity

		for ( let evaluator of this.evaluators ) {

			const desirabilty = evaluator.calculateDesirability( this.owner );
			desirabilty *= evaluator.characterBias;

			if ( desirabilty >= bestDesirabilty ) {

				bestDesirabilty = desirabilty;
				bestEvaluator = evaluator;

			}

		}

		// use the evaluator to set the respective goal

		if ( bestEvaluator !== null ) {

			bestEvaluator.setGoal( this.owner );

		} else {

			Logger.error( 'YUKA.Think: Unable to determine goal evaluator for game entity:', this.owner );

		}

		return this;

	}

}


export { Think };