/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Box3.js
 *
 */

import { Vector3 } from './Vector3.js';

const vector = new Vector3();

class AABB {

	constructor( min = new Vector3(), max = new Vector3() ) {

		this.min = min;
		this.max = max;

	}

	set( min, max ) {

		this.min = min;
		this.max = max;

		return this;

	}

	copy( aabb ) {

		this.min.copy( aabb.min );
		this.max.copy( aabb.max );

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	clampPoint( point, result ) {

		result.copy( point ).clamp( this.min, this.max );

		return this;

	}

	containsPoint( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z ? false : true;

	}

	intersectsBoundingSphere( sphere ) {

		// find the point on the AABB closest to the sphere center

		this.clampPoint( sphere.center, vector );

		// if that point is inside the sphere, the AABB and sphere intersect.

		return vector.squaredDistanceTo( sphere.center ) <= ( sphere.radius * sphere.radius );

	}

	equals( aabb ) {

		return ( aabb.min.equals( this.min ) ) && ( aabb.max.equals( this.max ) );

	}

}

export { AABB };