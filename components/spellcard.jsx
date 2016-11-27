import React from 'react';
import Markdown from './markdown.jsx';

const renderTime = ({type, size}) => `${size} ${type}`;

const renderComponents = ({v, s, m, components}) => [
	v && 'V',
	s && 'S',
	m && `M (${components})`
].filter(Boolean).join(', ');

const renderDistance = ({type, size}) =>
	  type === 'touch' ? 'Touch'
	: type === 'self' ? 'Self'
	: renderTime({type, size});

const renderArea = ({type, size, text}) => 
	  type === 'objects-less-than' ? `Up to ${size} objects`
	: type === 'creatures-less-than' ? `Up to ${size} objects`
	: type === 'unknown' ? text
	: renderDistance({type, size});

const renderRange = ({range, 'target-area': targetArea}) =>
	`${renderDistance(range)}${targetArea ? ` (${renderArea(targetArea)})` : ''}`

const renderDuration = ({duration, concentration}) =>
	  duration.type === 'instant' ? 'Instant'
	: duration.type === 'special' ? 'Special'
	: `Up to ${renderTime(duration)}${concentration ? ' (concentration)' : ''}`;

const ord = n => n + (({
	1: 'st',
	2: 'nd',
	3: 'rd'
})[n] || 'th');

const renderLevelAndSchool = ({level, school}) =>
	level > 0 ? `${ord(level)}-level ${school}`
	: `${school} cantrip`

class SpellCard extends React.Component {
	render() {
		return <article>
			<h2>{this.props.spell.name}</h2>
			<h3>{renderLevelAndSchool(this.props.spell)}</h3>
			<dl>
				<dt>Casting Time</dt>
				<dd>{renderTime(this.props.spell['casting-time'])}</dd>
				<dt>Range</dt>
				<dd>{renderRange(this.props.spell)}</dd>
				<dt>Components</dt>
				<dd>{renderComponents(this.props.spell)}</dd>
				<dt>Duration</dt>
				<dd>{renderDuration(this.props.spell)}</dd>
			</dl>

			<Markdown text={this.props.spell['original-description']} />
		</article>;
	}
}

export default SpellCard;