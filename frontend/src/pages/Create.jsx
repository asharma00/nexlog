import { useContext, useState, useRef, useEffect } from 'react'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'
import { Link, useParams } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import { toast } from 'react-toastify'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Loading from '../util/Loading'
import { addBlog, updateBlog } from '../util/BlogOperations.js'

function Create({mode}) {
    const { backendURL, token, navigate, blogs, userData } = useContext(BlogContext);
    
    var blogId, blogDetails;
    if(mode === 'edit') {
        blogId =  useParams();
        blogDetails = blogs?.find(item => item._id === blogId.blogId);
    }
    

    var tagsArray = [];
    const initialHTML = '';
    const [isLoading, setIsLoading] = useState(false);

    const [thumbnail, setThumbnail] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [blog, setBlog] = useState(initialHTML);


    const getTagsArray = () => {
        tagsArray = tags.split(',').filter(item => item).map(item => {return item.trim()});
    }


    const editorRef = useRef(null);
    const formRef = useRef(null);
    const hasPrefilledForm = useRef(false);
    const hasPastedRef = useRef(false);
    const quillRef = useRef(null);
    const hasInitialized = useRef(false); 
    const pendingStatusRef = useRef('published');


    useEffect(() => {
        if (hasInitialized.current) return;

        hasInitialized.current = true;
        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ align: [] }],
                    ['blockquote', 'code-block', 'link'],
                    [{ list: 'ordered'}, { list: 'bullet' }, { list: 'check' }],
                    [{ script: 'sub'}, { script: 'super' }]
                ]
            }
        });

        quillRef.current = quill;

        const handleChange = () => {
            setBlog(quill.root.innerHTML);
        };

        quill.on('text-change', handleChange);
        setBlog(quill.root.innerHTML);

        return () => {
            quill.off('text-change', handleChange);
        };
    }, [])


    const handleSave = (status) => {
        if (quillRef.current) {
            pendingStatusRef.current = status;
            formRef.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        }
    };


    useEffect(() => {
        if (mode !== 'edit' || !blogDetails) return;
        if (hasPrefilledForm.current) return;

        setThumbnail(blogDetails.thumbnail);
        setTitle(blogDetails.title);
        setSummary(blogDetails.summary);
        setCategory(blogDetails.category);
        setTags(
            Array.isArray(blogDetails.tags)
                ? blogDetails.tags.join(', ')
                : blogDetails.tags || ''
        );

        hasPrefilledForm.current = true;
    }, [mode, blogDetails]);


    useEffect(() => {
        if (mode !== 'edit' || !blogDetails || !quillRef.current) return;

        if (hasPastedRef.current) return;

        const savedHtml = blogDetails.blog || '';
        if (!savedHtml) {
            hasPastedRef.current = true;
            return;
        }

        quillRef.current.clipboard.dangerouslyPasteHTML(savedHtml);
        setBlog(savedHtml);
        hasPastedRef.current = true;
    }, [mode, blogDetails]);


    const onSubmitHandler = async(event) => {
        event.preventDefault();

        const html = quillRef.current?.root.innerHTML || '';

        const isFormValidated = thumbnail !== false && title !== '' && summary !== '' && category!== '' && blog !== '';
        if(!isFormValidated) {
            toast.error('Please fill all fields marked with *.')
            return;
        }

        setIsLoading(true);
        getTagsArray();
        
        try {
            const formData = new FormData();

            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('category', category);
            formData.append('tags', JSON.stringify(tagsArray));
            formData.append('blog', html);
            formData.append('status', pendingStatusRef.current);
            if(mode === 'edit') formData.append('id', blogDetails._id);

            thumbnail && formData.append('thumbnail', thumbnail);

            mode === 'edit' ? updateBlog(backendURL, token, formData, pendingStatusRef.current) : addBlog(backendURL, token, formData);

            setIsLoading(false);
            navigate(`/profile/${userData._id}`);
        } 
        catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <div>
            <div className='mx-8 sm:mx-16 xl:mx-40 mb-10'>
                <h1 className='text-4xl text-(--main-text-colour) mb-5 text-center font-bold'> { mode === 'edit' ? 'Edit the blog' : 'Create new blog' }</h1>
                <form ref={ formRef } onSubmit={ onSubmitHandler } className='bg-(--post-background) p-5 shadow-lg rounded-lg'>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Thumbnail <span className='text-red-700 text-base font-bold'>*</span> </p>
                        <label htmlFor='thumbnail'>
                            { 
                                !thumbnail 
                                    ? <AddPhotoAlternateIcon className='cursor-pointer text-(--main-text-colour)' /> 
                                    : typeof thumbnail === 'string' 
                                        ? <img src={thumbnail} className='w-30 cursor-pointer rounded-md'/>
                                        : <img src={ URL.createObjectURL(thumbnail) } className='w-30 cursor-pointer rounded-md' /> 
                            }
                            <input type='file' accept='image/*' id='thumbnail' onChange={(e) => setThumbnail(e.target.files[0])} hidden />
                        </label>
                    </div>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Title <span className='text-red-700 text-base font-bold'>*</span> </p>
                        <input type='text' className='w-full px-3 py-2 border border-gray-300 focus:outline-(--theme-background) rounded-md font-normal text-(--contrast-colour-negative)' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={ title } />
                    </div>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Summary <span className='text-red-700 text-base font-bold'>*</span> </p>
                        <textarea type='text' rows='3' className='w-full px-3 py-2 border border-gray-300 focus:outline-(--theme-background) rounded-md font-normal text-(--contrast-colour-negative)' placeholder='Summary' onChange={(e) => setSummary(e.target.value)} value={ summary } />
                    </div>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Category <span className='text-red-700 text-base font-bold'>*</span> </p>
                        <select className='w-full px-3 py-2 border border-gray-300 focus:outline-(--theme-background) rounded-md font-normal text-(--contrast-colour-negative)' onChange={(e) => setCategory(e.target.value)} value={ category }>
                            <option className='w-full px-3 py-2 border-0 rounded-md text-sm font-normal' value={ '' } disabled>--- SELECT ---</option>
                            <option className='w-full px-3 py-2 border-0 rounded-md text-sm font-normal' value={ 'Technology' }>Technology</option>
                            <option className='w-full px-3 py-2 border-0 rounded-md text-sm font-normal' value={ 'Sports' }>Sports</option>
                            <option className='w-full px-3 py-2 border-0 rounded-md text-sm font-normal' value={ 'Entertainment' }>Entertainment</option>
                            {/* <option className='w-full px-3 py-2 border-0 rounded-md text-sm font-normal' value={ 'Technology' }>Technology</option> */}
                        </select>
                    </div>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Tags (Separate them using comma) </p>
                        <input type='text' className='w-full px-3 py-2 border border-gray-300 focus:outline-(--theme-background) rounded-md font-normal text-(--contrast-colour-negative)' placeholder='Tags' onChange={(e) => setTags(e.target.value)} value={ tags } />
                    </div>
                    <div className='w-full mb-4'>
                        <p className='font-semibold text-sm'>Content <span className='text-red-700 text-base font-bold'>*</span> </p>
                        <div>
                            <div ref={ editorRef } className='text-(--contrast-colour-negative)' />
                        </div>
                    </div>
                    
                    <div className='flex flex-row justify-end'>
                        <Link to={'/'}> <button className='w-max px-4 py-2 bg-red-500 mr-3 rounded-md text-white shadow font-semibold text-sm cursor-pointer'>Cancel</button> </Link>
                        <button type='button' className='w-max px-4 py-2 bg-gray-500 mr-3 rounded-md text-white shadow font-semibold text-sm cursor-pointer' onClick={() => handleSave('unpublished')}>Save as draft</button>
                        <button type='button' className='w-max px-4 py-2 bg-(--theme-background) rounded-md text-white shadow font-semibold text-sm cursor-pointer' onClick={() => handleSave('published')}>Publish</button>
                    </div>
                </form>
            </div>

            <Loading isLoading={isLoading} />
        </div>
    )
}

export default Create