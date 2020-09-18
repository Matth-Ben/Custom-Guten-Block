import './style.scss';
import './editor.scss';

import Inspector from './inspect';
import Preview from "./preview";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;

const getPost = ({ attributes, setAttributes }) => {
	if (!attributes.postID) return Promise.reject();
	fetch(`/wp/wp-json/wp/v2/${attributes.postType}/${attributes.postID}`).then(response => response.json()).then((post) => {
		const promises = [];

		setAttributes({ post });
		if (post.author !== undefined) {
			promises.push(fetch( `/wp/wp-json/wp/v2/users/${post.author}` ).then(response => response.json()).then((author) => {
				setAttributes({ author });
			}));
		}
		// Category
		if (post.categories !== undefined) {
			promises.push(fetch(`/wp/wp-json/wp/v2/categories/${post.categories[0]}`).then(response => response.json()).then((category) => {
				setAttributes({ category });
			}));
		}
		// Featured Media
		if (post.featured_media !== undefined && post.featured_media !== 0) {
			promises.push(fetch(`/wp/wp-json/wp/v2/media/${post.featured_media}`).then(response => response.json()).then((image) => {
				setAttributes({ image });
			}));
		}
		let queue = Promise.resolve();
		for (let idx = 0, len = promises.length; idx < len; idx++) {
			queue = queue.then(() => promises[idx], () => promises[idx]);
		}
		return queue;
	});
};

const data = {
	title: __( "Bloc Article"),
	description: __("Afficher un article de votre choix"),
	icon: { background: '#2F313A', foreground: '#DEBB8F', src: 'admin-post' },
	category: 'common',
	keywords: [
		__( 'recents posts alt' ),
	],
	attributes: {
		postID: {
			type: 'integer',
		},
		postType: {
			type: 'string',
			default: 'Post',
		},
		post: {
			type: 'object',
		},
		author: {
			type: 'object',
		},
		category: {
			type: 'object',
		},
		image: {
			type: 'object',
		},
		showCategory: {
			type: 'boolean',
			default: true,
		},
		showAuthor: {
			type: 'boolean',
			default: true,
		},
		showImage: {
			type: 'boolean',
			default: true,
		},
	},

	edit: class Editor extends Component {
		constructor(props) {
			super(props);
			getPost(this.props);
		}

		render() {
			return <Fragment>
				<Inspector {...this.props} />
				<Preview {...this.props} />
			</Fragment>;
		}

		componentDidUpdate(props) {
			if (this.props.attributes.postID !== props.attributes.postID) {
				getPost(this.props);
			}
		}
	},
	save: (props) => {
		return <Preview {...props} />;
	},
};

registerBlockType(
	'guten-block/block-article',
	data
);
