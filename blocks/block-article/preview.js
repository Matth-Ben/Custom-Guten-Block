import { __ } from '@wordpress/i18n'
const { Component } = wp.element

export default class Preview extends Component {
	render() {
		if (!this.props.attributes.postID) {
			return <p className="AGB-block-message">
				{__('Search for a post in the inspector', 'advanced-gutenberg-blocks')}
			</p>;
		}

		if (!this.props.attributes.post) {
			return <p className="AGB-block-message">
				{__('Loading post…', 'advanced-gutenberg-blocks')}
			</p>;
		}

		return <div className="wp-block-advanced-gutenberg-blocks-post">
			{this.props.attributes.image && this.props.attributes.showImage && (
				<a
					href={this.props.attributes.post.link}
					className="wp-block-advanced-gutenberg-blocks-post__image"
					style={{
						backgroundImage: `url(${this.props.attributes.image.media_details.sizes[this.props.attributes.image.media_details.sizes.large ? 'large' : 'full'].source_url})`
					}}
				/>
			)}
			<div className="wp-block-advanced-gutenberg-blocks-post__content">
				<p className="wp-block-advanced-gutenberg-blocks-post__title">
					<a href={this.props.attributes.post.link}>{this.props.attributes.post.title.rendered}</a>
				</p>
				<p className="wp-block-advanced-gutenberg-blocks-post__metas">
					<em>
						{this.props.attributes.category && this.props.attributes.showCategory && (
							<span> {__('In', 'advanced-gutenberg-blocks') + ' ' + this.props.attributes.category.name} </span>
						)}
						{this.props.attributes.author && this.props.attributes.showAuthor && (
							<span> {__('By', 'advanced-gutenberg-blocks') + ' ' + this.props.attributes.author.name} </span>
						)}
					</em>
				</p>
				<div
					className="wp-block-advanced-gutenberg-blocks-post__excerpt"
					dangerouslySetInnerHTML={{
						__html: this.props.attributes.post.excerpt ? this.props.attributes.post.excerpt.rendered : ''
					}}
				/>
				<p className="wp-block-advanced-gutenberg-blocks-product__actions">
					<a href={this.props.attributes.post.link} className="wp-block-advanced-gutenberg-blocks-post__button">
						{__('Read more', 'advanced-gutenberg-blocks')}
					</a>
				</p>
			</div>
		</div>;
	}
};
