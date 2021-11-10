1. What is the difference between Component and PureComponent? give an
example where it might break my app. <br>
Answer: <br>
Component re-renders when shouldComponentUpdate is called or when its parent re-renders.
PureComponent on the other hand re-renders when props or state changes.
The only thing I can think of that could be problematic is,
if you have arrays or objects as props in a pureComponent because it implements shouldComponentUpdate with a shallow
prop and state comparison. So, if it's given the current and next prop or state object it will not re-render even if
a property of the object changes because it will still point to the same reference.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why
is that? <br>
Answer: <br>
if you use the Context API and have a PureComponent or a Component that implements shouldComponentUpdate,
it will block context update propagation to all of it's descendants
if the props or state don't change in a pureComponent or when shouldComponentUpdate returns false.

3. Describe 3 ways to pass information from a component to its PARENT. <br>
Answer: <br>
-One way using Class Components would be by writing a function the sets what is given to it as a parameter in state
and then passing it as a prop to the child Component and calling it in the child component
while giving it the data that needs to passed to the parent. <br>
-the other way I would use in functional components is by using the useState hook 
and passing the setter function as a prop to the child component and 
setting the state of the parent from within the child component. <br>
-another way would be by creating a context with a default value and a function in the parent and wrapping the child component with the context Provider component and giving it a setter function of the parent's state,
and then accessing the context in the child component by using the context Consumer component and giving the data to the parent's setter.

4. Give 2 ways to prevent components from re-rendering. <br>
Answer: <br>
-in class components it would be what I described in the answer of the first question 
by either extending the PureComponent class and having immutable props or implementing shouldComponentUpdate to prevent the component
from re-rendering given a condition. <br>
-in functional components it would be memoizing your component by wrapping it with React.memo()

5. What is a fragment and why do we need it? Give an example where it
might break my app. <br>
Answer: <br>
a fragment is basically a way to return multiple JSX elements in a component
without the need to wrap them in a parent div or something like that.
Off the top of my head I would imagine if you return invalid JSX/HTML it would break the app. And I don't know if this is relevant
to the question but also if you return multiple elements by looping through an array and getting data from it to render you will
have a warning in the console saying you have to have a unique key given as a prop to each element in the list.

6. Give 3 examples of the HOC pattern. <br>
Answer: <br>
-the first example I can give would be if you had an application that needs datatables from different datasources and different column definitions.
it would be useful to have one datatable component that you wrap in a HOC that sets the datasource and columns, and then gives them as props to the datatable component. <br>
-another example I can think of is if you have to create a list but let's say when you click on the items it should be a different output
for each type of list and you can't just put them in one component. So it would be wise to create a HOC List Component that will act as a
container for the component given to it as a prop which would be normaly a fragment containing the list items. <br>
-the 3rd example I can think of is if you want to have some sort of middleware that checks if a user is logged in in the client side so you write a HOC component that takes
the protected component as a prop and checks everytime if the user is logged in depending on your auth logic and either returns that component or redirects you to the login page.
 

7. what's the difference in handling exceptions in promises, callbacks and
async...await. <br>
Answer: <br>
-for async...await you would have to wrap it in a try catch like this: `const fetchData = async ()=>{//fetching data asynchronously}; try { await fetchData();} catch(err){//handle the caught error here}`

-for Promises you would use chaining like this: `runFunction().then((result)=>{//callback here}).catch((error)=>{//here you would handle the error however you feel appropriate});`

-for callbacks the error should be given as a parameter to the callback function like this: `runFunction(parameter,(result,error)=>{//handle result and error conditionally here});`
 
8. How many arguments does setState take and why is it async. <br>
Answer: <br>
setState takes 2 arguments an Object and a callback function. to my knowledge (I could be wrong) it is async because if it were synchronous it might lead to undesirable behaviour and blocking other UI updates
if it takes too long which might freeze your app. just like how synchronous xhr calls would freeze the UI when it takes too long to get a response from the server.

9. List the steps needed to migrate a Class to Function Component. <br>
Answer: <br>
I would start by changing class declarations to function declarations and removing the constructor.
then removing any reference to the this keyword and using the useState hook to manage state, defining props as a parameter of the function (CTRL+F and replace in VSCode will come in handy), 
change all the method declarations into function declarations and finally remove lifecycle methods and replace them with React Hooks.

10. List a few ways styles can be used with components. <br>
Answer: <br>
-you can use CSS files with classes and set the className props of your JSX elements just like you would with HTML/CSS.
-you can set inline styles with the `style={{}}` prop in individual JSX elements.
-you can also use a 3rd party library like Material-UI to have CSS-in-JS styled components, which is just a way to define your CSS in javascript objects to give you the best of both worlds.
11. How to render an HTML string coming from the server. <br>
Answer: <br>
if you aren't using Server Side Rendering then you have to use the dangerouslySetInnerHTML prop and give it an object like this:`{_html:theHtmlStringComingFromYourServer}`
