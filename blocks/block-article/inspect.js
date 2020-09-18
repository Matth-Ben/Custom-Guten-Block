import SearchPost from '../../components/searchpost'

import { __ } from '@wordpress/i18n'
const { Component } = wp.element
const { InspectorControls } = wp.blockEditor
const { PanelBody, ToggleControl } = wp.components

export default class Inspector extends Component {
	render() {
		const { attributes: { postID, showImage, showAuthor, showCategory }, setAttributes } = this.props

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Choose a post', 'advanced-gutenberg-blocks' ) }>
					<SearchPost
						onChange={ result => setAttributes( { postID: result.id, postType: result.type } )  }
						restURL="/wp/wp-json/wp/v2"
					/>
				</PanelBody>
				{!!postID && (
					<PanelBody title={ __( 'Customize', 'advanced-gutenberg-blocks' ) }>

						<ToggleControl
							label={ __( 'Show Image?', 'advanced-gutenberg-blocks' ) }
							checked={ showImage }
							onChange={ () => setAttributes( { showImage: ! showImage } ) }
						/>

						<ToggleControl
							label={ __( 'Show Author?', 'advanced-gutenberg-blocks' ) }
							checked={ showAuthor }
							onChange={ () => setAttributes( { showAuthor: ! showAuthor } ) }
						/>

						<ToggleControl
							label={ __( 'Show Category?', 'advanced-gutenberg-blocks' ) }
							checked={ showCategory }
							onChange={ () => setAttributes( { showCategory: ! showCategory } ) }
						/>

					</PanelBody>
				) }

			</InspectorControls>
		)
	}
}
