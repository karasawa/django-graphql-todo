import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphene import relay
from graphql_jwt.decorators import login_required
import graphql_jwt

class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        filter_fields = {
            'email': ['exact', 'icontains'],
        }
        interfaces = (relay.Node,)

class CreateUserMutation(relay.ClientIDMutation):
    class Input:
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(UserNode)

    def mutate_and_get_payload(self, info, **input):
        user = get_user_model()(
            email=input.get('email'),
        )
        user.set_password(input.get('password'))
        user.save()

        return CreateUserMutation(user=user)

class Mutation(graphene.AbstractType):
    create_user = CreateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()

class Query(graphene.ObjectType):
    all_user = DjangoFilterConnectionField(UserNode)

    def resolve_all_user(self, info, **kwargs):
        return get_user_model().objects.all()