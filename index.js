import "./style.scss"
import "./editor.scss"

import classnames from 'classnames'

// Import de nos composants
import Settings from './settings'
import Toolbar from './toolbar'

import icon from './icons'
import deprecated from './deprecated'

// Les imports WP sont allégés
const { __ } = wp.i18n
const { registerBlockType, createBlock } = wp.blocks
const { RichText } = wp.blockEditor
const { Fragment } = wp.element

const types = [
	{
		slug: 'advice',
		title: __( 'Advice', 'advanced-gutenberg-blocks' ),
		icon: 'thumbs-up',
	},
	{
		slug: 'info',
		title: __( 'Information', 'advanced-gutenberg-blocks' ),
		icon: 'info',
	},
	{
		slug: 'warning',
		title: __( 'Warning', 'advanced-gutenberg-blocks' ),
		icon: 'warning',
	},
	{
		slug: 'avoid',
		title: __( 'Avoid', 'advanced-gutenberg-blocks' ),
		icon: 'dismiss',
	},
]

registerBlockType("guten-block/composants", {
	title: __("Blocs Notice"),
	icon: "edit",
	category: "custom-block",
	keywords: [
		__("composants")
	],
	styles: [
		{
			name: 'default',
			label: __( 'Top Line', 'advanced-gutenberg-blocks' ),
			isDefault: true
		},
		{
			name: 'full',
			label: __( 'Full', 'advanced-gutenberg-blocks' )
		},
	],
	attributes: {
		type: {
			source: 'attribute',
			selector: '.wp-block-advanced-gutenberg-blocks-notice',
			attribute: 'data-type',
			default: types[0].slug,
		},
		title: {
			source: 'text',
			type: 'string',
			selector: '.wp-block-advanced-gutenberg-blocks-notice__title',
			default: types[0].title,
		},
		hasIcon: {
			type: 'boolean',
			default: true,
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-advanced-gutenberg-blocks-notice__content',
		},
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: function ( attributes ) {
					return createBlock( 'advanced-gutenberg-blocks/notice', {
						content: attributes.content,
					} )
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: function ( attributes ) {
					return createBlock( 'core/paragraph', {
						content: attributes.content,
					} )
				}
			}
		]
	},
	edit: props => {
		const { attributes: { type, content, title, hasIcon }, className, setAttributes } = props

		return (
			<Fragment>

				<Settings { ...{ hasIcon, setAttributes } } />
				<Toolbar { ...{ type, types, setAttributes } } />

				<div className={ classnames('wp-block-advanced-gutenberg-blocks-notice',  `is-variation-${ type }`, hasIcon && 'has-icon' ) } data-type={ type }>

					{ hasIcon && icon[type] }

					<RichText
						tagName="p"
						value={ title }
						className='wp-block-advanced-gutenberg-blocks-notice__title'
						onChange={ title => setAttributes( { title } ) }
					/>

					<RichText
						tagName="p"
						placeholder={ __( 'Your tip/warning content', 'advanced-gutenberg-blocks' ) }
						value={ content }
						className='wp-block-advanced-gutenberg-blocks-notice__content'
						onChange={ content => setAttributes( { content } ) }
						keepPlaceholderOnFocus="true"
					/>
				</div>

			</Fragment>
		)
	},

	save: props => {

		const { type, title, content, hasIcon } = props.attributes

		return (
			<div className={ classnames('wp-block-advanced-gutenberg-blocks-notice',  `is-variation-${ type }`, hasIcon && 'has-icon' ) } data-type={ type }>
				{ hasIcon && icon[type] }
				<p className='wp-block-advanced-gutenberg-blocks-notice__title'>{ title }</p>
				<p className='wp-block-advanced-gutenberg-blocks-notice__content'>{ content }</p>
			</div>
		)
	},
	deprecated
})
