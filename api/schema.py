import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Todo
from graphene import relay
from graphql_relay import from_global_id
from graphql_jwt.decorators import login_required

class TodoNode(DjangoObjectType):
    class Meta:
        model = Todo
        filter_fields = {
            'task': ['exact', 'icontains'],
            'is_completed': ['exact', 'icontains'],
        }
        interfaces = (relay.Node,)

class TodoCreateMutation(relay.ClientIDMutation):
    class Input:
        task = graphene.String(required=True)

    todo = graphene.Field(TodoNode)

    def mutate_and_get_payload(self, info, **input):
        todo = Todo(
            task=input.get('task'),
        )
        todo.save()

        return TodoCreateMutation(todo=todo)

class TodoDeleteMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    todo = graphene.Field(TodoNode)

    def mutate_and_get_payload(self, info, **input):
        todo = Todo(
            id=from_global_id(input.get('id'))[1],
        )
        todo.delete()

        return TodoDeleteMutation(todo=None)

class TodoUpdateMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        task = graphene.String(required=True)
        is_completed = graphene.Boolean(required=True)

    todo = graphene.Field(TodoNode)

    def mutate_and_get_payload(self, info, **input):
        todo = Todo(
            id=from_global_id(input.get('id'))[1],
        )
        todo.task = input.get('task')
        todo.is_completed = input.get('is_completed')
        todo.save()

        return TodoUpdateMutation(todo=todo)

class Mutation(graphene.AbstractType):
    create_todo = TodoCreateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()
    update_todo = TodoUpdateMutation.Field()

class Query(graphene.ObjectType):
    todo = graphene.Field(TodoNode, id=graphene.NonNull(graphene.ID))
    all_todos = DjangoFilterConnectionField(TodoNode)

    def resolve_todo(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Todo.objects.get(id=from_global_id(id)[1])

    def resolve_all_todos(self, info, **kwargs):
        return Todo.objects.all()
